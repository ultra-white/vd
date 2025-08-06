# ----------------------------------------
# Build Stage: PHP extensions + Composer
# ----------------------------------------
ARG PHP_VERSION=8.3-alpine
ARG COMPOSER_VERSION=2

FROM php:${PHP_VERSION} AS builder

# Install system dependencies and PHP extensions
RUN apk update \
    && apk add --no-cache \
       git \
       unzip \
       libzip \
       libpng \
       libjpeg-turbo \
       freetype \
       nodejs \
       npm \
       oniguruma-dev \
       libxml2-dev \
       icu-dev \
       postgresql-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
       pdo \
       pdo_pgsql \
       intl \
       zip \
       dom \
       gd \
    && rm -rf /var/cache/apk/*

# Install Composer
COPY --from=composer:${COMPOSER_VERSION} /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy PHP dependencies for build
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --optimize-autoloader --classmap-authoritative

# Copy full application
COPY . .

# Generate optimized autoload including scripts
RUN composer dump-autoload --optimize --classmap-authoritative && \
    php artisan package:discover --ansi

# Build frontend assets
RUN npm ci && npm run build

# ----------------------------------------
# Production Stage: application runtime
# ----------------------------------------
FROM php:${PHP_VERSION}

# Install runtime PHP extensions
RUN apk update \
    && apk add --no-cache \
       libzip \
       libpng \
       libjpeg-turbo \
       freetype \
       icu \
       postgresql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
       pdo_pgsql \
       gd \
       zip \
       intl \
    && rm -rf /var/cache/apk/*

WORKDIR /var/www/html

# Copy built app from builder
COPY --from=builder /app /var/www/html

# Caches and publish Filament assets
RUN php artisan vendor:publish --tag=filament-assets --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]

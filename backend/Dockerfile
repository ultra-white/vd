# Stage 1: build PHP + assets
FROM node:20-alpine AS node-build

WORKDIR /var/www

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: final PHP image
FROM php:8.3-fpm

# Системные зависимости и PHP-расширения
RUN apt update && apt install -y \
    libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev libicu-dev \
  && docker-php-ext-install pdo pdo_pgsql intl zip dom \
  && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Копируем PHP-часть приложения и vendor
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Копируем скомпилированные фронт-ассеты из node-build
COPY --from=node-build /var/www/public/build public/build
COPY --from=node-build /var/www/public/vendor public/vendor

# Оставшиеся артефакты приложения
COPY . .

# Filament: публикуем ассеты и кэшируем
RUN php artisan vendor:publish --tag=filament-assets \
 && php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache

# Права
RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]

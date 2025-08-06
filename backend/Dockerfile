# ----------------------------------------
# Build Stage: PHP extensions + Composer + Node
# ----------------------------------------
ARG PHP_VERSION=8.3
ARG COMPOSER_VERSION=2

FROM php:${PHP_VERSION}-alpine AS builder

# Устанавливаем системные зависимости и расширения для сборки
RUN apk update \
    && apk add --no-cache \
       git \
       unzip \
       libzip-dev \
       libpng-dev \
       libjpeg-turbo-dev \
       freetype-dev \
       oniguruma-dev \
       libxml2-dev \
       icu-dev \
       postgresql-dev \
       nodejs \
       npm \
    && docker-php-ext-configure zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
       pdo \
       pdo_pgsql \
       intl \
       zip \
       dom \
       gd \
    && rm -rf /var/cache/apk/*

# Устанавливаем Composer из официального образа
COPY --from=composer:${COMPOSER_VERSION} /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Копируем зависимые файлы и устанавливаем PHP-зависимости
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --optimize-autoloader \
    --classmap-authoritative \
    --no-scripts

# Копируем весь код приложения и запускаем скрипты discovery
COPY . .
RUN composer dump-autoload --optimize --classmap-authoritative \
    && php artisan package:discover --ansi

# Собираем фронтенд-ассеты
RUN npm ci \
    && npm run build

# Очищаем build-кэши npm
RUN rm -rf node_modules

# ----------------------------------------
# Production Stage: runtime
# ----------------------------------------
FROM php:${PHP_VERSION}-alpine AS production

# Устанавливаем только runtime-библиотеки и расширения
RUN apk update \
    && apk add --no-cache \
       libzip \
       libpng \
       libjpeg-turbo \
       freetype \
       icu \
       postgresql-client \
    && docker-php-ext-configure zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
       pdo_pgsql \
       zip \
       gd \
       intl \
    && rm -rf /var/cache/apk/*

WORKDIR /var/www/html

# Копируем файлы из builder-а
COPY --from=builder /app /var/www/html

# Кэшируем конфигурацию Laravel и публикуем assets
RUN php artisan vendor:publish --tag=filament-assets --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Правим права на директории кэша и логов
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose PHP-FPM порт
EXPOSE 9000

# Запускаем FPM
USER www-data
CMD ["php-fpm"]

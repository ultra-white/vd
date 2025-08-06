FROM php:8.3-fpm

# Установи нужные расширения (если ещё нет)
RUN apt update && apt install -y \
    libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev libicu-dev \
    && docker-php-ext-install pdo pdo_pgsql intl zip dom

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan key:generate \
    && php artisan config:cache \
    && php artisan route:cache

EXPOSE 8000

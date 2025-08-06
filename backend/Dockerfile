FROM php:8.3-fpm

RUN apt update && apt install -y \
    libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev libicu-dev \
    && docker-php-ext-install pdo pdo_pgsql intl zip dom

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader \

RUN php artisan vendor:publish --tag=filament-assets \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]

FROM php:8.3-fpm

# Установим зависимости
RUN apt update && apt install -y \
    libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev libicu-dev \
    && docker-php-ext-install pdo pdo_pgsql intl zip

# Установим Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Рабочая директория
WORKDIR /var/www

# Копируем проект
COPY . .

# Установка зависимостей
RUN composer install

# Генерация ключа и кэш
RUN php artisan key:generate

# Laravel будет запущен artisan-ом
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

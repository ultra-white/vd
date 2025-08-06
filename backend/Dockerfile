# Базовый образ с PHP 8.3 и Node.js
FROM php:8.3-fpm

# Установим системные зависимости и расширения PHP
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libpng-dev \
    libonig-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libpq-dev \
    nodejs \
    npm \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        mbstring \
        zip \
        exif \
        pcntl \
        bcmath \
        gd \
        intl \
        dom \
        xml

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка рабочей директории
WORKDIR /var/www

# Копируем остальной код
COPY . .

# Копируем зависимости отдельно, чтобы использовать кэш
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader


# Установка Node.js зависимостей и билд ассетов
RUN npm install && npm run build

# Установка прав доступа
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]

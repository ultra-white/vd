# ----------------------------------------
# 1) composer-stage: собираем PHP-зависимости
# ----------------------------------------
FROM php:8.3-fpm AS composer-stage

# Устанавливаем системные зависимости и PHP-расширения
RUN apt update \
 && apt install -y libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev libicu-dev \
 && docker-php-ext-install pdo pdo_pgsql intl zip dom \
 && rm -rf /var/lib/apt/lists/*

# Копируем Composer и запускаем установку зависимостей
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# ----------------------------------------
# 2) node-build: собираем фронтенд-ассеты
# ----------------------------------------
FROM node:20-alpine AS node-build

WORKDIR /app

# Копируем только то, что нужно для npm ci + vendor из первого этапа
COPY package.json package-lock.json ./
COPY --from=composer-stage /app/vendor ./vendor
RUN npm ci

# Копируем остальной код и делаем сборку
COPY . .
RUN npm run build

# ----------------------------------------
# 3) final: финальный образ PHP-FPM
# ----------------------------------------
FROM php:8.3-fpm

# Устанавливаем PHP-расширения, Composer
RUN apt update \
 && apt install -y libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev libicu-dev \
 && docker-php-ext-install pdo pdo_pgsql intl zip dom \
 && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Копируем PHP-код и уже готовый vendor
COPY --from=composer-stage /app/vendor ./vendor
COPY composer.json composer.lock ./

# Остальной код
COPY . .

# Копируем собранные фронтенд-ассеты
COPY --from=node-build /app/public/build ./public/build
COPY --from=node-build /app/public/vendor ./public/vendor

# Кэшируем и паблишим
RUN php artisan vendor:publish --tag=filament-assets \
 && php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache

# Права
RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]

# Base image PHP-FPM
FROM php:8.4-rc-fpm

ARG user=wallace
ARG uid=1000

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    unzip \
    gnupg \
    ca-certificates \
    lsb-release \
    nginx \
    openssl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets intl zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -u $uid -G www-data,root -m -d /home/$user $user && \
    mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

RUN pecl install -o -f redis && \
    docker-php-ext-enable redis

COPY . /var/www
RUN chown -R $user:www-data /var/www

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 9000

WORKDIR /var/www

USER $user

CMD ["php-fpm"]

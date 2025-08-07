FROM node:18

# Установка зависимостей для strapi
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (не глобально)
RUN npm install

# Копируем весь проект
COPY . .

# Открываем порт Strapi
EXPOSE 1337

# Запуск в dev-режиме
CMD ["npm", "run", "develop"]

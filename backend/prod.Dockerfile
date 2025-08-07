# ---- 1) Установка зависимостей ----
FROM node:20-bookworm AS deps
WORKDIR /app

# build-аргументы (чтобы не падало при передаче их через docker-compose)
ARG DATABASE_CLIENT
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG NODE_ENV=production

# Копируем манифесты для кеша установки
COPY package.json package-lock.json* ./
RUN npm ci

# ---- 2) Сборка проекта ----
FROM node:20-bookworm AS build
WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- 3) Production-образ ----
FROM node:20-slim AS prod
WORKDIR /app

# build-аргументы для совместимости с docker-compose
ARG DATABASE_CLIENT
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG NODE_ENV=production

# runtime-переменные
ENV NODE_ENV=${NODE_ENV} \
    HOST=0.0.0.0 \
    PORT=1337 \
    STRAPI_TELEMETRY_DISABLED=true

# Устанавливаем только prod-зависимости
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Копируем нужные директории
COPY --from=build /app/build ./build
COPY --from=build /app/dist ./dist
COPY --from=build /app/config ./config
COPY --from=build /app/public ./public
# Если проект на чистом JS без dist:
# COPY --from=build /app/src ./src

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
  CMD node -e "require('http').get('http://localhost:1337/_health', r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["npm", "run", "start"]

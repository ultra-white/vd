# ---------- STAGE 1: build ----------
FROM node:20-slim AS builder

# Опционально: ускорить npm ci внутри контейнера
ENV CI=true

WORKDIR /app

# Копируем только манифесты, чтобы кеш сборки работал эффективнее
COPY package*.json ./

# Устанавливаем зависимости (включая dev — нужны для сборки админки)
RUN npm ci

# Копируем остальной код
COPY . .

# Собираем админку и сервер (Strapi использует этот шаг для прод-режима)
ENV NODE_ENV=production
RUN npm run build

# После сборки вычищаем dev-зависимости
RUN npm prune --omit=dev


# ---------- STAGE 2: runtime ----------
FROM node:20-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

# Базовые пакеты и init-процесс
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Копируем всё из builder (с уже собранной админкой и очищенными зависимостями)
COPY --from=builder /app /app

# Непривилегированный пользователь
RUN useradd -r -s /usr/sbin/nologin strapi \
 && chown -R strapi:strapi /app

# Папка для загрузок (персистим через volume)
VOLUME ["/app/public/uploads"]

# Открываем порт Strapi
EXPOSE 1337

# Healthcheck (опционально поправь путь, если у тебя есть кастомный /health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:1337/admin').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

USER strapi

# В прод-режиме Strapi стартует через 'start'
CMD ["dumb-init", "npm", "run", "start"]

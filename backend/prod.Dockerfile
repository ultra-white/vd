# ---------- STAGE 1: build ----------
FROM node:20-slim AS builder

WORKDIR /app
ENV NODE_ENV=development

# Копируем package.json и lock (если есть)
COPY package*.json ./

# Установка зависимостей (dev нужны для сборки админки)
# Если lock-файл рассинхронизирован — fallback на npm install
RUN if [ -f package-lock.json ]; then \
      npm ci || (echo "Lock mismatch, using npm install" && npm install); \
    else \
      npm install; \
    fi

# Копируем остальной код
COPY . .

# Сборка админки Strapi
ENV NODE_ENV=production
RUN npm run build

# Очищаем dev-зависимости для продакшена
RUN npm prune --omit=dev


# ---------- STAGE 2: runtime ----------
FROM node:20-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

# Устанавливаем только нужные утилиты
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Копируем собранный проект с зависимостями
COPY --from=builder /app /app

# Создаем пользователя для безопасности
RUN useradd -r -s /usr/sbin/nologin strapi \
 && chown -R strapi:strapi /app

# Папка для загружаемых файлов
VOLUME ["/app/public/uploads"]

# Открываем порт Strapi
EXPOSE 1337

# Healthcheck (опционально)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:1337/admin').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

USER strapi

# Запуск Strapi в продакшене
CMD ["dumb-init", "npm", "run", "start"]

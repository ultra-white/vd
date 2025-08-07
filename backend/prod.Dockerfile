# syntax=docker/dockerfile:1.7
# ---------- STAGE 1: build ----------
FROM node:20-slim AS builder

WORKDIR /app
ENV NODE_ENV=development \
    # Больше попыток и таймауты для npm (боремся с 503)
    NPM_CONFIG_FETCH_RETRIES=6 \
    NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000 \
    NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000 \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    CI=true

# Копируем только манифесты (лучший кеш)
COPY package*.json ./

# Установка зависимостей c кешем и ретраями
# Если lock рассинхронизирован — fallback на npm install
RUN --mount=type=cache,target=/root/.npm \
    set -e; \
    install_cmd() { \
      if [ -f package-lock.json ]; then \
        npm ci || (echo "Lock mismatch, fallback to npm install" >&2; npm install); \
      else \
        npm install; \
      fi; \
    }; \
    tries=0; \
    until install_cmd; do \
      tries=$((tries+1)); \
      if [ "$tries" -ge 5 ]; then echo "npm install failed after $tries attempts" >&2; exit 1; fi; \
      echo "npm failed (attempt $tries), retrying in ${tries}s..." >&2; \
      sleep "$tries"; \
    done

# Копируем остальной код
COPY . .

# Сборка админки/бэка
ENV NODE_ENV=production
RUN npm run build

# Убираем dev-зависимости
RUN --mount=type=cache,target=/root/.npm npm prune --omit=dev


# ---------- STAGE 2: runtime ----------
FROM node:20-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update && apt-get install -y --no-install-recommends \
      dumb-init ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app

RUN useradd -r -s /usr/sbin/nologin strapi \
 && chown -R strapi:strapi /app

VOLUME ["/app/public/uploads"]

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:1337/admin').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

USER strapi
CMD ["dumb-init", "npm", "run", "start"]

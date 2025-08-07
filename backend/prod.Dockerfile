# ---- 1) Build stage ----
FROM node:22-alpine AS build

# build args из docker-compose (для совместимости; в сборке не используются)
ARG DATABASE_CLIENT
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG NODE_ENV=production

RUN apk update && apk add --no-cache \
    build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1

ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/

COPY package.json package-lock.json ./

# Лучше для сборки иметь dev-зависимости, но оставляю как у тебя:
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .

# Сборка админки Strapi
RUN npm run build

# ---- 2) Runtime stage ----
FROM node:22-alpine

# build args (совместимость с docker-compose)
ARG DATABASE_CLIENT
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG NODE_ENV=production

RUN apk add --no-cache vips-dev

# runtime ENV (могут быть переопределены в docker-compose:environment)
ENV NODE_ENV=${NODE_ENV} \
    HOST=0.0.0.0 \
    PORT=1337 \
    STRAPI_TELEMETRY_DISABLED=true

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules

WORKDIR /opt/app
COPY --from=build /opt/app ./

ENV PATH=/opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node

EXPOSE 1337

# (опционально добавь HEALTHCHECK, если нужно)
CMD ["npm", "run", "start"]

# Vento D'oro — интернет-магазин одежды

Полностековое веб-приложение интернет-магазина бренда **Vento D'oro**. Клиентская часть построена на Next.js 15 с App Router, серверная — на Strapi 5 как headless CMS. Сервисы развёрнуты в Docker Compose с базой данных PostgreSQL и Nginx в качестве обратного прокси.

---

## Технологический стек

| Слой | Технология |
|---|---|
| Клиент | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Состояние | Zustand 5 (корзина, `localStorage`) |
| CMS / API | Strapi 5 (REST API) |
| База данных | PostgreSQL 17.4 |
| Прокси | Nginx (Alpine) + Certbot / Let's Encrypt |
| Контейнеры | Docker Compose |

---

## Функциональность

- Каталог товаров с галереями изображений
- Страница товара: размерная таблица, выбор размера и количества, проверка остатков
- Корзина с сохранением в `localStorage`
- Многошаговое оформление заказа: данные покупателя → доставка → оплата
- Блог со статьями в формате Markdown/Rich Text
- Отзывы покупателей
- Адаптивный дизайн, плавный скролл (Lenis)

---

## Структура репозитория

```
VentoDoro/
├── frontend/          # Next.js 15 приложение
│   └── src/
│       ├── app/       # Страницы (App Router)
│       ├── components/# UI-компоненты
│       ├── stores/    # Zustand-хранилища
│       └── types/     # TypeScript-типы
├── backend/           # Strapi 5 CMS
│   └── src/
│       ├── api/       # Коллекции: product, order, article, review
│       └── components/# Повторяемые компоненты (sizes, order items)
├── nginx/             # Конфигурация Nginx
├── compose.dev.yaml   # Docker Compose для разработки
├── compose.prod.yaml  # Docker Compose для продакшна
├── Makefile           # Команды управления контейнерами
└── .env               # Переменные окружения
```

---

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

```env
# База данных
DATABASE_CLIENT=postgres
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_NAME=ventodoro
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_password

# Strapi
APP_KEYS=key1,key2,key3,key4
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt
NODE_ENV=development

# Next.js (клиентская часть)
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your_strapi_api_token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Примечание.** `NEXT_PUBLIC_STRAPI_TOKEN` — API-токен из панели администратора Strapi
> (Settings → API Tokens → Create new API Token).

---

## Запуск в среде разработки

### Требования

- Docker Desktop
- Make (или запускайте команды из `Makefile` вручную)

### Команды

```bash
# Сборка образов
make build-dev

# Запуск контейнеров (фоновый режим)
make start-dev

# Остановка
make stop-dev

# Полная пересборка и перезапуск
make rebuild-dev
```

После запуска сервисы доступны по адресам:

| Сервис | URL |
|---|---|
| Next.js | http://localhost:3000 |
| Strapi API | http://localhost:1337 |
| Strapi Admin | http://localhost:1337/admin |
| PostgreSQL | localhost:5432 |

Папки `frontend/src` и `frontend/public` монтируются в контейнер — изменения применяются без перезапуска.

---

## Развёртывание в продакшне

### Требования

- VPS/выделенный сервер с установленным Docker и Docker Compose
- Доменное имя, направленное на IP сервера

### Настройка Nginx

Отредактируйте файлы в `nginx/`:

- `nginx/ventodoro.conf` — основной домен (`ventodoro.ru`)
- `nginx/admin.ventodoro.conf` — административный поддомен (`admin.ventodoro.ru`)

Замените имена доменов на свои.

### Команды

```bash
# Сборка продакшн-образов
make build-prod

# Запуск
make start-prod

# Остановить
make stop-prod

# Получить свежий код, пересобрать и перезапустить
make repull
```

TLS-сертификаты Let's Encrypt выпускаются и обновляются автоматически через Certbot (обновление каждые 12 часов).

---

## API-коллекции Strapi

### `product`

| Поле | Тип | Описание |
|---|---|---|
| `name` | string (50) | Название товара |
| `slug` | string, unique | URL-идентификатор |
| `price` | decimal | Цена |
| `image` | media (single) | Главное изображение |
| `images` | media (multiple) | Галерея |
| `description` | text (350) | Описание |
| `structure` | string (75) | Состав ткани |
| `season` | string (75) | Сезон |
| `product_parametres` | string (150) | Параметры изделия |
| `model_parametres` | string (150) | Параметры модели |
| `sizes` | component (repeatable) | Размеры `product.razmer` |
| `reviews` | relation (oneToMany → review) | Отзывы |

**Компонент `product.razmer`:**

| Поле | Тип |
|---|---|
| `size` | enum: XS / S / M / L |
| `russian_size` | integer |
| `quantity` | integer |
| `breast` / `waist` / `hip` / `back` | integer (мерки, см) |

### `order`

| Поле | Тип | Описание |
|---|---|---|
| `full_name` | string | ФИО покупателя |
| `phone` | string (20) | Телефон |
| `email` | string | E-mail (необязательно) |
| `address` | text | Адрес доставки |
| `payment_type` | enum | «Наличные» / «qr-код» |
| `delivery_method` | enum | «Курьер» / «Яндекс доставка» / «Почта России» |
| `order_status` | enum | «Создан» / «Отправлено» / «Доставлен» |
| `items` | dynamiczone | `order.product` (товар, размер, кол-во) |

### `article`

| Поле | Тип |
|---|---|
| `title` | string |
| `slug` | string, unique |
| `description` | text (200) |
| `text` | richtext |
| `general_image` | media |

### `review`

| Поле | Тип |
|---|---|
| `name` | string |
| `text` | text (1000) |
| `published` | boolean (по умолчанию `false`) |
| `product` | relation (manyToOne → product) |

---

## Маршруты Next.js

| Маршрут | Страница |
|---|---|
| `/` | Главная (hero, витрина, блог, отзывы) |
| `/catalog` | Каталог товаров |
| `/catalog/[slug]` | Страница товара |
| `/cart` | Корзина |
| `/blog` | Список статей |
| `/blog/[slug]` | Статья |
| `/reviews` | Отзывы покупателей |
| `/privacy_policy` | Политика конфиденциальности |

---

## Архитектура продакшн-окружения

```
                        Интернет
                           │
                    ┌──────▼──────┐
                    │    Nginx    │ :80 → HTTPS redirect
                    │   (Alpine)  │ :443 → proxy
                    └──────┬──────┘
              ┌────────────┼────────────┐
              │            │            │
        ventodoro.ru  /api/, /uploads/  admin.ventodoro.ru
              │            │            │
       ┌──────▼──┐   ┌─────▼──────┐    │
       │ Next.js │   │  Strapi 5  │◄───┘
       │  :3000  │   │   :1337    │
       └─────────┘   └─────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ PostgreSQL  │
                    │    17.4     │
                    └─────────────┘
```

---

## Менеджер пакетов

Фронтенд использует **pnpm** (`pnpm@10.14.0`). Бэкенд использует **npm**.

---

## Лицензия

Проект является частью учебной дипломной работы. Все права на дизайн и бренд принадлежат авторам проекта.

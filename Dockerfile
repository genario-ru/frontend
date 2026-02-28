# Этап 1: Сборка приложения
FROM node:20-alpine AS builder

# Установка pnpm версии 9.x (совместимо с lockfileVersion 9.0)
RUN npm install -g pnpm@9

# Установка рабочей директории
WORKDIR /app

# Принимаем build аргументы для переменных окружения
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

# Копирование файлов зависимостей
COPY package.json pnpm-lock.yaml ./

# Установка зависимостей
RUN pnpm install --frozen-lockfile

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN pnpm build

# Этап 2: Продакшн образ с nginx
FROM nginx:alpine

# Копирование собранных файлов из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]


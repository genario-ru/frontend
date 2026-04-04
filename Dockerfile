# Этап 1: Сборка приложения
FROM node:20-alpine AS builder

RUN npm install -g pnpm@10

WORKDIR /app

# Vite инлайнит эти переменные в JS-бандл во время сборки,
# поэтому они нужны именно здесь, а не в runtime
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Этап 2: Продакшн образ с nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
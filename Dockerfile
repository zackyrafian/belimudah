FROM node:22-alpine AS builder
WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /build/dist/ /usr/share/nginx/html/
COPY default.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
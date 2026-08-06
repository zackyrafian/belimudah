FROM alpine:latest AS clone-project
WORKDIR /src
RUN apk add --no-cache git
RUN git clone --depth 1 https://github.com/zackyrafian/koda-b8-react .

FROM node:alpine AS builder
WORKDIR /build
COPY --from=clone-project /src/package*.json ./
RUN npm ci
COPY --from=clone-project /src/ .

ARG VITE_SERVER_URL=http://103.127.96.192:9301

RUN VITE_SERVER_URL=${VITE_SERVER_URL} npm run build

FROM nginx:alpine
COPY --from=builder /build/dist/ /usr/share/nginx/html/
COPY --from=builder /build/default.nginx.conf /etc/nginx/conf.d/default.conf
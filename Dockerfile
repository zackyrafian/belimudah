FROM alpine:latest AS clone-project

WORKDIR /src
RUN apk add git
RUN git clone https://github.com/zackyrafian/koda-b8-react .

FROM node:alpine AS builder
WORKDIR /build
COPY --from=clone-project /src/ .
RUN npm install 

ARG VITE_SERVER_URL=http://103.127.96.192:9301
ENV VITE_SERVER_URL=$VITE_SERVER_URL

RUN npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=builder /build/dist/ . 
COPY --from=builder /build/default.nginx.conf /etc/nginx/conf.d/default.conf 

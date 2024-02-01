FROM node:16.14.0-alpine3.15 AS builder

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add build-base bash curl \
    libffi-dev jpeg-dev zlib-dev openssl-dev \
    autoconf automake libc6-compat libjpeg-turbo-dev \
    libpng-dev nasm libtool g++ make git python3

RUN npm install -g node-gyp \
    && rm -rf /var/cache/apk/*

ARG stage=staging

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./

RUN mv .env.$stage .env
RUN npm run build

# #--------------------------------------
# # Stage: Packaging Apps
# #--------------------------------------
FROM nginx:1.25-alpine

VOLUME /app
COPY --from=builder /app/dist /app

EXPOSE 80

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]

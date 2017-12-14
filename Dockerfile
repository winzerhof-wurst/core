FROM node:9.3.0 as js-builder
RUN pwd
COPY . /app
WORKDIR /app
RUN npm install
RUN ./node_modules/webpack/bin/webpack.js --config webpack.prod.config.js

FROM composer:latest as php-builder
COPY . /app
RUN composer install --no-dev -o

FROM winzerhofwurst/webserver:latest
COPY . /var/www
COPY --from=js-builder /app/public/assets /var/www/public/assets
COPY --from=php-builder /app/vendor /var/www/vendor
USER root
RUN chown -R www-data /var/www && \
    chgrp -R 0 /var/www && \
    chmod -R g+rw /var/www/storage && \
    chmod -R u+rw /var/www/storage
USER www-data
WORKDIR /var/www

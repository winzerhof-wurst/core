FROM node:9.2 as js-builder
RUN pwd
COPY . /app
WORKDIR /app
RUN npm install
RUN ./node_modules/bower/bin/bower install --allow-root
RUN ./node_modules/requirejs/bin/r.js -o build.js

FROM composer:latest as php-builder
COPY . /app
RUN composer install --no-dev -o

FROM winzerhofwurst/webserver:latest
COPY . /var/www
COPY --from=js-builder /app/public/js/wiwu.min.js /var/www/public/js/wiwu.min.js
COPY --from=js-builder /app/public/vendor /var/www/public/vendor
COPY --from=php-builder /app/vendor /var/www/vendor
USER root
RUN chown -R www-data:www-data /var/www && chmod u+rw /var/www/storage
USER www-data
WORKDIR /var/www

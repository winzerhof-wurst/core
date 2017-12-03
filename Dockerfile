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

FROM php:7.1-apache-jessie
COPY deploy/apache.conf /etc/apache2/sites-available/wiwu.conf
RUN apt-get update && apt-get install -y --no-install-recommends \
    libmcrypt-dev \
    mysql-client \
    && docker-php-ext-install mcrypt pdo_mysql \
    && a2enmod rewrite \
    && a2dissite 000-default.conf \
    && a2ensite wiwu.conf
COPY . /var/www
COPY --from=js-builder /app/public/js/wiwu.min.js /var/www/public/js/wiwu.min.js
COPY --from=js-builder /app/public/vendor /var/www/public/vendor
COPY --from=php-builder /app/vendor /var/www/vendor
RUN chown -R www-data:www-data /var/www && chmod u+rw /var/www/storage
WORKDIR /var/www

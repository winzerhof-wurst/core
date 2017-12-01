FROM php:7.1-apache-jessie

RUN apt-get update && apt-get install -y --no-install-recommends \
    libmcrypt-dev \
    mysql-client \
    && docker-php-ext-install mcrypt pdo_mysql
COPY deploy/apache.conf /etc/apache2/sites-available/wiwu.conf
RUN a2enmod rewrite \
    && a2dissite 000-default.conf \
    && a2ensite wiwu.conf
COPY ./ /var/www
RUN chown -R www-data:www-data /var/www && chmod u+rw /var/www/storage
WORKDIR /var/www

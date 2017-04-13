#!/bin/bash

set -ev

BRANCH=${TRAVIS_PULL_REQUEST_BRANCH:-$TRAVIS_BRANCH}
TAG=`if [ "$BRANCH" == "master" ]; then echo "latest"; else echo $BRANCH | awk '{gsub("/","_",$0)}1' ; fi`

docker build -t winzerhofwurst/app:$TAG -f deploy/app.docker .
docker build -t winzerhofwurst/web:$TAG -f deploy/web.docker .

docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
docker push winzerhofwurst/app
docker push winzerhofwurst/web

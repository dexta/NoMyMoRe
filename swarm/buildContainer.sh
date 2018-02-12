#!/bin/sh

echo "go one up for build all docker files"
cd ..
sleep 1

docker build -t monitor/dockertest ./monitor/
docker build -t webapp/dockertest ./webapp/
docker build -t helloworld/dockertest ./helloWorld/



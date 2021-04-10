FROM ubuntu:latest

USER root
WORKDIR /home/app

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get install -y nodejs

#COPY . ./
#RUN npm install

#CMD npx ng serve --host 0.0.0.0
#docker run -it -p 4200:4200 --entrypoint /bin/bash my_container


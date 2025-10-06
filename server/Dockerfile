FROM node:21.4

WORKDIR /usr/app

COPY server/src/ ./
COPY server/data/ ./

WORKDIR /usr/app/src/

RUN npm install

EXPOSE 8080
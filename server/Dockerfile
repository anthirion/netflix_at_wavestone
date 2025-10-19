FROM node:21.4

WORKDIR /usr/app

COPY server/src/ ./

WORKDIR /usr/app/src/

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
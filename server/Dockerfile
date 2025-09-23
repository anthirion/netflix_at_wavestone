FROM node:21.4

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm install

COPY server/ ./server/
COPY data/ ./data/

EXPOSE 8080

CMD ["npm", "start"]
FROM node:21.4

WORKDIR /usr/app

ENV DATABASE_URL=${DATABASE_URL}

COPY server/src/ ./
COPY server/data/ ./

WORKDIR /usr/app/src/

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
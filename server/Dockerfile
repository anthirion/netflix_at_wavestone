FROM node:24-alpine
COPY . /app
WORKDIR /app
RUN npm install
ENV DATABASE_URL="mongodb://localhost:27017/Netflix"
EXPOSE 4000
CMD ["npm", "start"]
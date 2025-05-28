FROM node:24-alpine
COPY server/ /anthirion/server
COPY data/ /anthirion/data
WORKDIR /anthirion/server
RUN npm install
ENV DATABASE_URL="mongodb+srv://anthirion:WSAPILvl1@netflix.qehn2lx.mongodb.net/?retryWrites=true&w=majority&appName=Netflix"
EXPOSE 8080
CMD ["npm", "start"]
FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY src ./src

COPY .sequelizerc ./.sequelizerc

RUN npm install

EXPOSE 8080

CMD ["node", "src/server.js"]
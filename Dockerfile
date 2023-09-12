FROM node:14-slim

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install

COPY . ./

CMD npm run dev
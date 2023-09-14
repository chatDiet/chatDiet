FROM node:14-slim

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install --production

COPY . ./

CMD npm run dev
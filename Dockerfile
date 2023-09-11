FROM node:14

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install

COPY . ./

CMD npm run dev
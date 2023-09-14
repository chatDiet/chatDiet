FROM node:14

WORKDIR /chatdiet

COPY . ./

RUN npm install

CMD npm run dev
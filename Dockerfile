FROM node:14

WORKDIR /chatdiet

COPY . ./

CMD npm run dev
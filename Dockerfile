FROM node:14

WORKDIR /chatdiet

RUN npm install

COPY . ./

CMD npm run dev
# 
FROM node:14

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install

RUN ls -a

COPY . ./

CMD npm run dev
# 
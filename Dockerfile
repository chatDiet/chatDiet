FROM node:14

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install

COPY . ./

RUN ls -a

CMD npm run dev
# 
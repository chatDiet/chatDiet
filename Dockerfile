FROM node:14

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install

COPY /home/runner/work/chatDiet/chatDiet/.env ./

COPY . ./

CMD npm run dev
# 
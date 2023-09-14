FROM node:14-slim

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install --production \
    && apt-get update \
    && apt-get install -y procps

COPY . ./

CMD npm run dev
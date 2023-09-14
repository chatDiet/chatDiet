FROM node:14-slim

WORKDIR /chatdiet

COPY package*.json ./

RUN npm install --production \
    && apt-get update \
    && apt-get install -y procps

COPY . ./

CMD ["/usr/local/bin/node", "/chatdiet/node_modules/@babel/node/lib/_babel-node", "init.js"]

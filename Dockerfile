FROM node:14

COPY package*.json ./

RUN npm install

CMD ["npm run dev"]
# 
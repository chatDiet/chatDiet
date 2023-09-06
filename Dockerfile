FROM node:14

COPY package*.json ./

RUN npm install --no-audit

RUN npm install

COPY . .

CMD ["npm run dev"]

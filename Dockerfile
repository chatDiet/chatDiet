FROM node:14

WORKDIR /chatDiet

COPY package*.json ./

RUN npm install --no-audit

RUN npm install

COPY . .

# 애플리케이션을 빌드합니다. 필요한 빌드 명령어로 변경하세요.
# 예: npm run build
RUN npm run build

CMD ["npm run dev"]

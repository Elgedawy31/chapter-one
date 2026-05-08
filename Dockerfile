FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run typecheck && npm run lint && npm run format:check && npm run test:run

CMD ["npm", "run", "test:run"]

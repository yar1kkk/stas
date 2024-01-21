FROM node:18 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18.18.2-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY . .

COPY --from=builder /usr/src/app /usr/src/app

EXPOSE 3000

CMD [ "npm", "start"]

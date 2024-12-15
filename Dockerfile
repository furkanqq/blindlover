FROM node:21-alpine3.18

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

COPY .env .env

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
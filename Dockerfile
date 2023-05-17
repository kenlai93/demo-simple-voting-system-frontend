FROM node:18-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /workspace

COPY ./package*.json /workspace

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD npm run start

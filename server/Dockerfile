FROM node:16-alpine3.16 as base

RUN apk update && apk upgrade
RUN apk add --no-cache curl \
    && apk add --no-cache tini

ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app

RUN chown node:node /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install \
    && npm cache clean --force

COPY . .

USER node

CMD ["npx", "tsx", "src/server.ts"]
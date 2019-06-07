FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent

COPY . /app

RUN npm run build

CMD [ "npm", "start" ]

FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install 

COPY . .
EXPOSE 7000
CMD [ "node" ,"index.js"]

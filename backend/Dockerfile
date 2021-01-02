FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.* ./ 

RUN yarn install

COPY . . 

EXPOSE 3000

CMD ["yarn", "dev"]
FROM node:17-alpine3.14

WORKDIR /microservice-repo/main

COPY . .

RUN npm -g install npm@7.24.2 

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
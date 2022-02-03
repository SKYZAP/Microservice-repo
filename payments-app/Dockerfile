FROM node:17-alpine3.14 

WORKDIR /microservice-repo/payments-app

RUN npm -g install npm@7.24.2 

COPY package.json ormconfig.json ./

RUN npm install

COPY . .

EXPOSE 3011

CMD ["npm","start"]
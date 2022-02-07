## Microservice Application V2

A TypeScript NestJS application recreated based off the SETEL backend assessment.

## Setup & Running
Make sure Docker & Docker compose are installed locally on your computer then run
```
docker-compose up
```
## Testing
Unit tests were written for the main application and orders application and then can be accessed by running the following command in their respective CLIs
```
npm test
```

## REST APIs
All APIs can be accessed from http://localhost:3000

Get All Orders (GET)
```
http://localhost:3000/orders/findAll
```

Create Order (POST)
```
http://localhost:3000/orders/create
```

Cancel Order (PUT)
```
http://localhost:3000/orders/cancelOrder/:id
```

Check Order Status (GET)
```
http://localhost:3000/orders/checkStatus/:id
```
Get All Payments (GET)
```
http://localhost:3000/payments/findAll
```



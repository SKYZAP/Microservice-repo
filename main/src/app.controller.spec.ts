import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderStatusI } from './utils';

describe('AppController', () => {
  let app: TestingModule;
  let controller;

  const order = {
    userId: '012220540493',
    productName: 'RON96',
    productPrice: 10,
    productQuantity: 5,
  };

  const mockedService = {
    createOrder: jest.fn(() => {
      return {
        id: 3230240242042,
        userId: '012220540493',
        productName: 'RON96',
        productPrice: 10,
        productQuantity: 5,
        totalCost: '50',
        orderState: OrderStatusI.CREATED,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    }),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(mockedService)
      .compile();
    controller = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should return a created Order', async () => {
      expect(await controller.createOrder({ input: order })).toEqual({
        id: expect.any(Number),
        userId: '012220540493',
        productName: expect.any(String),
        productPrice: 10,
        productQuantity: 5,
        totalCost: '50',
        orderState: OrderStatusI.CREATED,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      });
    });
  });
  // describe('findAllOrder', () => {
  //   it('should return all created Orders', async () => {
  //     expect(await controller.findAllOrder()).toBeInstanceOf(Array);
  //   });
  // });
  // describe('findOneOrder', () => {
  //   it('should return one created Orders', async () => {
  //     expect(await controller.findOneOrder({ id: orderId })).toBeInstanceOf(
  //       OrderDto,
  //     );
  //   });
  // });
});

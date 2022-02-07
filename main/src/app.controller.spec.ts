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
    findAllOrder: jest.fn(() => {
      return [
        {
          id: 3230240242042,
          userId: '012220540493',
          productName: 'RON96',
          productPrice: 10,
          productQuantity: 5,
          totalCost: '50',
          orderState: OrderStatusI.CREATED,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
    }),
    findOneOrder: jest.fn(() => {
      return {
        id: 120122121313,
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
    checkOrderStatus: jest.fn(() => {
      return 'CONFIRMED';
    }),
    cancelOrder: jest.fn(() => {
      return {
        id: 121323094948,
        userId: '012220540493',
        productName: 'RON96',
        productPrice: 10,
        productQuantity: 5,
        totalCost: '50',
        orderState: OrderStatusI.CANCELLED,
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
  describe('findAllOrder', () => {
    it('should return an array of Orders', async () => {
      expect(await controller.findAllOrder()).toEqual([
        {
          id: expect.any(Number),
          userId: '012220540493',
          productName: expect.any(String),
          productPrice: 10,
          productQuantity: 5,
          totalCost: '50',
          orderState: OrderStatusI.CREATED,
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
        },
      ]);
    });
  });
  describe('findOneOrder', () => {
    it('should return one Order', async () => {
      expect(await controller.findOneOrder({ id: '120122121313' })).toEqual({
        id: 120122121313,
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
  describe('checkOrderStatus', () => {
    it('should return status for one Order', async () => {
      expect(await controller.checkOrderStatus({ id: '121323094948' })).toEqual(
        'CONFIRMED',
      );
    });
  });
  describe('cancelOrder', () => {
    it('should return CANCELLED status for one Order', async () => {
      expect(await controller.cancelOrder({ id: '121323094948' })).toEqual({
        id: 121323094948,
        userId: '012220540493',
        productName: expect.any(String),
        productPrice: 10,
        productQuantity: 5,
        totalCost: '50',
        orderState: OrderStatusI.CANCELLED,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      });
    });
  });
});

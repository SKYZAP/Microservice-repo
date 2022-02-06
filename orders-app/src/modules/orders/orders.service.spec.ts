import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { OrderEntity } from './orders.entity';
import { OrderModule } from './orders.module';
import { OrderRepository } from './orders.repository';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service;
  const order = {
    userId: '012220540493',
    productName: 'RON96',
    productPrice: 10,
    productQuantity: 5,
  };
  let orderId;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OrderModule,
        ClientsModule.register([
          {
            name: 'Payments_Service',
            transport: Transport.TCP,
            options: { host: 'payments-app', port: 3011 },
          },
        ]),
        TypeOrmModule.forRootAsync({
          useFactory: async () =>
            Object.assign(await getConnectionOptions(), {
              autoLoadEntities: true,
            }),
        }),
        TypeOrmModule.forFeature([OrderRepository]),
      ],
      providers: [OrdersService],
    }).compile();

    service = await module.resolve(OrdersService);
    const testOrder = await service.create(order);
    orderId = testOrder.id;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const orders = await service.findAll();
      expect(orders).toBeInstanceOf(Array);
    });
  });
  describe('findOne', () => {
    it('should get a single order', async () => {
      expect(await service.findOne(orderId)).toBeInstanceOf(OrderEntity);
    });
  });
  describe('cancelOrder', () => {
    it('should cancel a single order', async () => {
      expect(await service.cancelOrder(orderId)).toBeInstanceOf(OrderEntity);
    });
  });
  describe('checkStatus', () => {
    it('should check status of an order', async () => {
      expect(await service.checkStatus(orderId)).toBeDefined();
    });
  });
});

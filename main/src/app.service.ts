import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './modules/order/create-order.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('Orders_Service') private orderClient: ClientProxy,
    @Inject('Payments_Service') private paymentClient: ClientProxy,
  ) {}

  async createOrder(input: CreateOrderDto) {
    try {
      return this.orderClient.send({ cmd: 'createOrder' }, { order: input });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllOrder() {
    try {
      return this.orderClient.send({ cmd: 'findAllOrder' }, '');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOneOrder(id: string) {
    try {
      return this.orderClient.send({ cmd: 'findOneOrder' }, { id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkOrderStatus(id: string) {
    try {
      return this.orderClient.send({ cmd: 'checkOrderStatus' }, { id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllPayment() {
    try {
      return this.paymentClient.send({ cmd: 'findAllPayment' }, '');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOnePayment(id: string) {
    try {
      return this.paymentClient.send({ cmd: 'findOnePayment' }, { id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkPaymentStatus(orderId: string) {
    try {
      return this.paymentClient.send(
        { cmd: 'checkPaymentStatus' },
        { id: orderId },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

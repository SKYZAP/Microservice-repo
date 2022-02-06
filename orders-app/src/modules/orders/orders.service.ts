import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusI } from '../../utils';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private ordersRepository: OrderRepository,
    @Inject('Payments_Service') private paymentClient: ClientProxy,
  ) {}

  public async findAll(): Promise<OrderDto[]> {
    try {
      return await this.ordersRepository.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findOne(id: string): Promise<OrderDto> {
    try {
      return await this.ordersRepository.findOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async create(input: CreateOrderDto): Promise<OrderDto> {
    try {
      const total = input.productPrice * input.productQuantity;
      const order = await this.ordersRepository.create({
        ...input,
        totalCost: total,
      });

      const savedOrder = await this.ordersRepository.save(order);

      this.paymentClient.emit('handlePayment', { input: savedOrder.id });

      return savedOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async checkStatus(id: string): Promise<string> {
    try {
      const orderExist = await this.ordersRepository.findOne(id);

      if (!orderExist) {
        throw new NotFoundException('Order not found');
      }

      return orderExist.orderState;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<OrderDto> {
    try {
      const orderExist = await this.ordersRepository.findOne(id);

      if (!orderExist) {
        throw new NotFoundException('Order not found');
      }

      await this.ordersRepository
        .createQueryBuilder('order')
        .delete()
        .where('id =:id', { id })
        .execute();

      return orderExist;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async cancelOrder(id: string): Promise<OrderDto> {
    try {
      const orderExist = await this.ordersRepository.findOne(id);

      if (!orderExist) {
        throw new NotFoundException('Order not found');
      }

      const newOrder = {
        ...orderExist,
        orderState: OrderStatusI.CANCELLED,
      };

      await this.ordersRepository.update({ id: orderExist.id }, newOrder);

      const cancelledOrder = await this.ordersRepository.findOne({
        id: orderExist.id,
      });

      return cancelledOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update(id: string, input: UpdateOrderDto): Promise<OrderDto> {
    try {
      const orderExist = await this.ordersRepository.findOne(id);

      if (!orderExist) {
        throw new NotFoundException('Order not found');
      }

      const newOrder = {
        ...orderExist,
        ...input,
      };

      return await this.ordersRepository.save(newOrder);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async success(id: string): Promise<OrderDto> {
    try {
      const order = await this.ordersRepository.findOne(id);

      if (!order) throw new NotFoundException('Order not found');

      const newOrder = {
        ...order,
        orderState: OrderStatusI.CONFIRMED,
      };

      // Auto delivers order after 6 seconds
      this.deliver(id);

      return await this.ordersRepository.save(newOrder);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async failed(id: string): Promise<OrderDto> {
    try {
      const order = await this.ordersRepository.findOne(id);

      if (!order) throw new NotFoundException('Order not found');

      const newOrder = {
        ...order,
        orderState: OrderStatusI.CANCELLED,
      };

      return await this.ordersRepository.save(newOrder);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async deliver(id: string) {
    try {
      setTimeout(async () => {
        const order = await this.ordersRepository.findOne(id);

        if (!order) throw new NotFoundException('Order not found');

        const newOrder = {
          ...order,
          orderState: OrderStatusI.DELIVERED,
        };

        await this.ordersRepository.save(newOrder);
      }, 6000);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

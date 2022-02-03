import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatusI } from '../../utils';
import { PaymentDto } from './dto/payments.dto';
import { PaymentEntity } from './payments.entity';
import { PaymentRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentRepository)
    private repository: PaymentRepository,
    @Inject('Orders_Service') private orderClient: ClientProxy,
  ) {}

  public async findAll(): Promise<PaymentDto[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findOne(id: string): Promise<PaymentDto> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async handlePayment(input: string): Promise<PaymentEntity> {
    try {
      const rand = Math.floor(Math.random() * 10);
      let status;

      switch (true) {
        case rand <= 6: {
          this.orderClient.emit('order_success', { id: input });
          status = PaymentStatusI.SUCCESS;
          break;
        }
        default: {
          this.orderClient.emit('order_failed', { id: input });
          status = PaymentStatusI.FAILED;
          break;
        }
      }
      const payment = this.repository.create({
        orderId: input,
        vendor: 'CIM Bank',
        status,
      });
      const newPayment = await this.repository.save(payment);
      return newPayment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async checkStatus(id: string): Promise<string> {
    try {
      const payment = await this.repository.findOne({ orderId: id });

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      return payment.status;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<PaymentDto> {
    try {
      const orderExist = await this.repository.findOne(id);

      if (!orderExist) {
        throw new NotFoundException('Order not found');
      }

      await this.repository
        .createQueryBuilder()
        .delete()
        .from(PaymentEntity)
        .where('id =:id', { id })
        .execute();

      return orderExist;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

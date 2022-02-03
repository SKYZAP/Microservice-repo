import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @MessagePattern({ cmd: 'findAllOrder' })
  public async findAll(): Promise<OrderDto[]> {
    return await this.service.findAll();
  }

  @MessagePattern({ cmd: 'findOneOrder' })
  public async findOne(@Payload('id') id: string): Promise<OrderDto> {
    return await this.service.findOne(id);
  }

  @MessagePattern({ cmd: 'checkOrderStatus' })
  public async checkStatus(@Payload('id') id: string): Promise<string> {
    return await this.service.checkStatus(id);
  }

  @MessagePattern({ cmd: 'createOrder' })
  public async create(
    @Payload('order') order: CreateOrderDto,
  ): Promise<OrderDto> {
    return await this.service.create(order);
  }

  @MessagePattern({ cmd: 'deleteOrder' })
  public async delete(@Payload('id') id: string): Promise<OrderDto> {
    return await this.service.delete(id);
  }

  @MessagePattern({ cmd: 'updateOrder' })
  public async update(
    @Payload('id') id: string,
    @Payload('order') order: UpdateOrderDto,
  ): Promise<OrderDto> {
    return await this.service.update(id, order);
  }

  @MessagePattern({ cmd: 'cancelOrder' })
  public async cancelOrder(@Payload('id') id: string): Promise<OrderDto> {
    return await this.service.cancelOrder(id);
  }

  @EventPattern('order_success')
  public async successfulOrder(@Payload('id') id: string): Promise<OrderDto> {
    return await this.service.success(id);
  }

  @EventPattern('order_failed')
  public async failedOrder(@Payload('id') id: string): Promise<OrderDto> {
    return await this.service.failed(id);
  }
}

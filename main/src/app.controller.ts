import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './modules/order/create-order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/orders/create')
  async createOrder(@Body() input: CreateOrderDto) {
    return await this.appService.createOrder(input);
  }

  @Get('/orders/findAll')
  async findAllOrder() {
    return await this.appService.findAllOrder();
  }

  @Get('/orders/findOne/:id')
  async findOneOrder(@Param() id: string) {
    return await this.appService.findOneOrder(id);
  }

  @Get('/orders/checkStatus/:id')
  async checkOrderStatus(@Param() id: string) {
    return await this.appService.checkOrderStatus(id);
  }

  @Put('/orders/cancelOrder/:id')
  async cancelOrder(@Param() id: string) {
    return await this.appService.cancelOrder(id);
  }

  @Get('/payments/findAll')
  async findAllPayment() {
    return await this.appService.findAllPayment();
  }

  @Get('/payments/findOne/:id')
  async findOnePayment(@Param() id: string) {
    return await this.appService.findOnePayment(id);
  }

  @Get('/payments/checkStatus/:id')
  async checkPaymentStatus(@Param('id') orderId: string) {
    return await this.appService.checkPaymentStatus(orderId);
  }
}

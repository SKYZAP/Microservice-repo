import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentDto } from './dto/payments.dto';
import { PaymentEntity } from './payments.entity';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @MessagePattern({ cmd: 'findAllPayment' })
  public async findAll(): Promise<PaymentDto[]> {
    return await this.service.findAll();
  }

  @MessagePattern({ cmd: 'findOnePayment' })
  public async findOne(@Payload('id') id: string): Promise<PaymentDto> {
    return await this.service.findOne(id);
  }

  @MessagePattern({ cmd: 'checkPaymentStatus' })
  public async checkStatus(@Payload('id') id: string): Promise<string> {
    return await this.service.checkStatus(id);
  }

  @EventPattern('handlePayment')
  public async handlePayment(
    @Payload('input') input: string,
  ): Promise<PaymentEntity> {
    return await this.service.handlePayment(input);
  }
}

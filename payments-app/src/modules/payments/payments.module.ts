import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './payments.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Orders_Service',
        transport: Transport.TCP,
        options: { host: 'orders-app', port: 3010 },
      },
    ]),
    TypeOrmModule.forFeature([PaymentRepository]),
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Payments_Service',
        transport: Transport.TCP,
        options: { host: 'payments-app', port: 3011 },
      },
    ]),
    TypeOrmModule.forFeature([OrderRepository]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrderModule {}

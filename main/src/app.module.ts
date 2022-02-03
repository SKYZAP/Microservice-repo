import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Orders_Service',
        transport: Transport.TCP,
        options: { host: 'orders-app', port: 3010 },
      },
    ]),
    ClientsModule.register([
      {
        name: 'Payments_Service',
        transport: Transport.TCP,
        options: { host: 'payments-app', port: 3011 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules/orders/orders.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), OrderModule],
})
export class AppModule {}

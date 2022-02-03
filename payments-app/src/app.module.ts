import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), PaymentsModule],
})
export class AppModule {}

export enum OrderStatusI {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatusI {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class OrderDto {
  id: string;
  userId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  totalCost: number;
  orderState: OrderStatusI;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderEntity {
  id: string;
  userId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  totalCost: number;
  orderState: OrderStatusI;
  createdAt: Date;
  updatedAt: Date;
}

import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsEmpty()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  @IsNumber()
  productQuantity: number;
}

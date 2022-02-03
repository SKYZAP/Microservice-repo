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

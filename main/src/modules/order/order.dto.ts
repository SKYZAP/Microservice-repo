import { OrderStatusI } from '../../utils';

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

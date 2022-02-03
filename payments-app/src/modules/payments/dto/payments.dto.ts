import { PaymentStatusI } from '../../../utils';

export class PaymentDto {
  id: string;
  orderId: string;
  vendor: string;
  status: PaymentStatusI;
  createdAt: Date;
  updatedAt: Date;
}

import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatusI } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Column, Entity, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column('integer')
  productQuantity: number;

  @Column('decimal')
  totalCost: number;

  @Column({ type: 'enum', enum: OrderStatusI, default: OrderStatusI.CREATED })
  orderState: OrderStatusI;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

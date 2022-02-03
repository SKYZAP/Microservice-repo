import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentStatusI } from '../../utils';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  vendor: string;

  @Column({ type: 'enum', enum: PaymentStatusI })
  status: PaymentStatusI;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { EntityRepository, Repository } from 'typeorm';
import { PaymentEntity } from './payments.entity';

@EntityRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity> {}

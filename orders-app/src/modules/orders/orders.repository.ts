import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from './orders.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {}

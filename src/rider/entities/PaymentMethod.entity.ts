import { User } from '../../auth/entities/User.entity';
import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  getRepository,
} from 'typeorm';
import { Rider } from './Rider.entity';
import { Transaction } from '@app/transactions/entities/transaction.entity';

@Entity('payment_methods')
export class PaymentMethod extends AbstractEntity {
  @Column()
  type: string;

  @Column()
  token: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column()
  payment_source_id: string;

  @JoinColumn()
  @ManyToOne((_) => Rider, (rider) => rider.payment_methods, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  rider: Rider;

  @OneToMany((_) => Transaction, (transaction) => transaction.payment_method)
  transactions: Transaction[];
}

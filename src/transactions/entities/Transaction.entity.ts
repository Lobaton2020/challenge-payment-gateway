import { AbstractEntity } from '@app/common/entities/AbstractEntity.entity';
import { PaymentMethod } from '@app/rider/entities/PaymentMethod.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Ride } from './Ride.entity';

export enum enumTransactionStatus {
  PENGING = 'PENGING',
  APPROVED = 'APPROVED',
}
@Entity('transactions')
export class Transaction extends AbstractEntity {
  @Column({ type: 'decimal' })
  amount: number;

  @Column({ enum: Object.values(enumTransactionStatus) })
  status: enumTransactionStatus;

  @JoinColumn()
  @ManyToOne(
    (_) => PaymentMethod,
    (paymentMethod) => paymentMethod.transactions,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  payment_method: PaymentMethod;

  @JoinColumn()
  @ManyToOne((_) => Ride, (ride) => ride.transactions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  ride: Ride;
}

import { User } from '../../auth/entities/User.entity';
import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PaymentMethod } from './PaymentMethod.entity';
import { Ride } from '@app/transactions/entities/Ride.entity';

@Entity('riders')
export class Rider extends AbstractEntity {
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.riders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany((_) => PaymentMethod, (paymentMethod) => paymentMethod.rider)
  payment_methods: PaymentMethod[];

  @OneToMany((_) => Ride, (ride) => ride.rider)
  rides: Ride[];
}

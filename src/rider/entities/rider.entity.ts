import { User } from '../../auth/entities/User.entity';
import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PaymentMethod } from './PaymentMethod.entity';

@Entity('riders')
export class Rider extends AbstractEntity {
  constructor(id?: number) {
    super();
    this.id = id;
  }
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.riders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany((_) => PaymentMethod, (paymentMethod) => paymentMethod.rider)
  payment_methods: PaymentMethod[];
}

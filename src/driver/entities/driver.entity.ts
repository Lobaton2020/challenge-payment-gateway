import { Ride } from '@app/transactions/entities/Ride.entity';
import { User } from '../../auth/entities/User.entity';
import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('drivers')
export class Driver extends AbstractEntity {
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.drivers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany((_) => Ride, (ride) => ride.driver)
  rides: Ride[];
}

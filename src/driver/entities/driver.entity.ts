import { User } from '../../auth/entities/User.entity';
import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('drivers')
export class Driver extends AbstractEntity {
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.drivers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}

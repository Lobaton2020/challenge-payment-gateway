import { User } from '../../auth/entities/User.entity';
import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('riders')
export class Rider extends AbstractEntity {
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.riders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}

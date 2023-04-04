import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity('address')
export class Address extends AbstractEntity {
  @Column()
  address_line_1: string;

  @Column({  })
  address_line_2: string;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;
  @Column()
  status: boolean;

  @JoinColumn()
  @ManyToOne((_) => User, (user) => user.addresses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}

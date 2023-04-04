import { AbstractEntity } from 'src/common/entities/AbstractEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './User.entity';

@Entity('rols')
export class Rol extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (users) => users.rol)
  users: User[];
}

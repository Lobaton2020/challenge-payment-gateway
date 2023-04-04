import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { Rol } from '@app/auth/entities/Rol.entity';
import { AbstractEntity } from '@app/common/entities/AbstractEntity.entity';
import { Address } from '@app/auth/entities/Address.entity';
import { Rider } from '@app/rider/entities/rider.entity';
import { Driver } from '@app/driver/entities/driver.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  completeName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'varchar', nullable: true, select: false })
  emailVerifyDate: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  recoveryPasswordToken: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }

  @JoinColumn()
  @ManyToOne((_) => Rol, (rol) => rol.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  rol: Rol;

  @OneToMany((_) => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany((_) => Driver, (driver) => driver.user)
  drivers: Driver[];

  @OneToMany((_) => Rider, (rider) => rider.user)
  riders: Rider[];
}

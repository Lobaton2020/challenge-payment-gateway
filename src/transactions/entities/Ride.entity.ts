import { AbstractEntity } from '@app/common/entities/AbstractEntity.entity';
import { Driver } from '@app/driver/entities/driver.entity';
import { Rider } from '@app/rider/entities/Rider.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Transaction } from './transaction.entity';

export enum enumRideStatus {
  CREATED = 'CREATED',
  WAITING = 'WAITING',
  IN_PROCESS = 'IN_PROCESS',
  ENDED = 'ENDED',
}

@Entity('rides')
export class Ride extends AbstractEntity {
  @Column({ enum: Object.values(enumRideStatus) })
  status: string;
  @Column({ nullable: true })
  start_latitud?: string;
  @Column({ nullable: true })
  start_longitud?: string;
  @Column({ nullable: true })
  end_latitud?: string;
  @Column({ nullable: true })
  end_longitud?: string;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  start_ride?: Date;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  end_ride?: Date;

  @JoinColumn()
  @ManyToOne((_) => Driver, (driver) => driver.rides, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  driver?: Driver;

  @JoinColumn()
  @ManyToOne((_) => Rider, (rider) => rider.rides, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  rider: Rider;

  @OneToMany((_) => Transaction, (transaction) => transaction.ride)
  transactions: Transaction[];
}

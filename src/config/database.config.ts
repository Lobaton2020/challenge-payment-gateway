import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path = require('path');
import { DATABASE_CONFIG, DEV_KEY } from './constants.config';
import { Rol } from '../auth/entities/Rol.entity';
import { User } from '../auth/entities/User.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Address } from '../auth/entities/Address.entity';
import { Rider } from '../rider/entities/rider.entity';

export default registerAs(DATABASE_CONFIG, (): TypeOrmModuleOptions & any => {
  return {
    type: (process.env.DATABASE_TYPE ?? 'mysql') as any,
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'test',
    synchronize: process.env.NODE_ENV === DEV_KEY ? true : false,
    logging: process.env.NODE_ENV === DEV_KEY ? true : false,
    autoLoadEntities: process.env.NODE_ENV === DEV_KEY ? true : false,
    entities:
      process.env.NODE_ENV === DEV_KEY
        ? ['dist/**/entities/*.entity.{js,ts}']
        : [Rol, User, Driver, Address, Rider],
    migrationsRun: false,
    seeds: ['dist/**/seeds/*.js'],
    migrations: [path.resolve(__dirname + './../migrations/*.js')],
  };
});

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import appConfig, { jwtConfig } from './config/app.config';
import { DATABASE_CONFIG } from './config/constants.config';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { RiderModule } from './rider/rider.module';
import databaseConfig from './config/database.config';
import envValidate from './config/env.validate';
import { DriverModule } from './driver/driver.module';
import { CommonModule } from './common/common.module';

const ConfigModuleProvider = ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}.local`,
  isGlobal: true,
  load: [databaseConfig, appConfig, jwtConfig],
  validationSchema: envValidate,
});

const TypeOrmModuleProvider = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get<TypeOrmModuleOptions>(DATABASE_CONFIG),
});

@Module({
  imports: [
    ConfigModuleProvider,
    TypeOrmModuleProvider,
    TransactionModule,
    DriverModule,
    RiderModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

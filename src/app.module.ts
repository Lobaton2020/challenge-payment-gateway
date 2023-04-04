import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import appConfig, {
  jwtConfig,
  paymentGatewayProvider,
} from './config/app.config';
import { DATABASE_CONFIG } from './config/constants.config';
import { AuthModule } from './auth/auth.module';
import { RiderModule } from './rider/rider.module';
import databaseConfig from './config/database.config';
import envValidate from './config/env.validate';
import { DriverModule } from './driver/driver.module';
import { CommonModule } from './common/common.module';
import { TransactionModule } from './transactions/transaction.module';

const ConfigModuleProvider = ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}.local`,
  isGlobal: true,
  load: [databaseConfig, appConfig, jwtConfig, paymentGatewayProvider],
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
    DriverModule,
    RiderModule,
    AuthModule,
    CommonModule,
    TransactionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

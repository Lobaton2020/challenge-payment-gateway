import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path = require('path');
import { AppController } from './app.controller';
import appConfig, { IEnvAppConfig } from './config/app.config';
import { APP_CONFIG } from './config/constants.config';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { TransactionModule } from './transaction/transaction.module';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: path.resolve(
    `.env.${process.env.NODE_ENV ?? 'development'}.local`,
  ),
  load: [appConfig],
  //TODO: add validation if have time
});
const typeormModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    ...configService.get<IEnvAppConfig>(APP_CONFIG).database,
    synchronize: true,
    entities: [],
  }),
});

@Module({
  imports: [
    configModule,
    // typeormModule,TODO: uncomment this
    PaymentMethodModule,
    TransactionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

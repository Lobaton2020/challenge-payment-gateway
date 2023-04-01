import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [PaymentMethodModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

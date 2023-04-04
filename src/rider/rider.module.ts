import { Module } from '@nestjs/common';
import { Rider } from './entities/Rider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { PaymentMethod } from './entities/PaymentMethod.entity';
import { CommonModule } from '@app/common/common.module';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rider, PaymentMethod]),
    CommonModule,
    AuthModule,
    
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class RiderModule {}

import { Module } from '@nestjs/common';
import { RideController } from './controllers/ride.controller';
import { RideService } from './services/ride.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Ride } from './entities/Ride.entity';
import { CommonModule } from '@app/common/common.module';
import { AuthModule } from '@app/auth/auth.module';
import { RiderModule } from '@app/rider/rider.module';
import { DriverModule } from '@app/driver/driver.module';
import { Rider } from '@app/rider/entities/Rider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Rider, Ride]),
    CommonModule,
    AuthModule,
  ],
  controllers: [
    TransactionController,
    RideController,
    RideController,
    RiderModule,
    DriverModule,
  ],
  providers: [TransactionService, RideService],
})
export class TransactionModule {}

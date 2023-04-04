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
import { Driver } from '@app/driver/entities/driver.entity';
import { Address } from '@app/auth/entities/Address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Rider, Ride, Driver, Address]),
    CommonModule,
    AuthModule,
    RiderModule,
    DriverModule,
  ],
  controllers: [TransactionController, RideController, RideController],
  providers: [RideService, TransactionService],
  exports: [RideService, TransactionService],
})
export class TransactionModule {}

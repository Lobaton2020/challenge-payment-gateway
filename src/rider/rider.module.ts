import { Module } from '@nestjs/common';
import { RiderService } from './rider.service';
import { RiderController } from './rider.controller';
import { Rider } from './entities/rider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rider])],
  controllers: [RiderController],
  providers: [RiderService],
})
export class RiderModule {}

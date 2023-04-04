import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride, enumRideStatus } from '../entities/Ride.entity';
import { Repository } from 'typeorm';
import { Rider } from '@app/rider/entities/Rider.entity';
import { EndRideDto, StartRideDto } from '../dto/start-ride.dto';
import { Driver } from '@app/driver/entities/driver.entity';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private readonly transactionService: TransactionService,
  ) {}

  async getRider(riderId) {
    const rider = await this.riderRepository.findOne({
      where: { id: riderId },
    });
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    return rider;
  }
  private async getEnableDriver() {
    const allDrivers = await this.driverRepository.find();
    const enable = [];
    for (const driver of allDrivers) {
      const ride = await this.rideRepository
        .createQueryBuilder('ride')
        .leftJoinAndSelect('ride.driver', 'driver')
        .where('driver.id = :driverId', { driverId: driver.id })
        .andWhere('ride.status = :status', { status: 'ENDED' })
        .getOne();
      if (!ride) {
        enable.push(driver);
      }
    }
    if (!enable.length) {
      throw new NotFoundException('Drivers busy please wait');
    }
    return enable[0]; //TODO: compare mo variables, etc
  }
  async create(riderId: number) {
    const newRide = new Ride();
    newRide.status = enumRideStatus.CREATED;
    newRide.rider = await this.getRider(riderId);
    return await this.rideRepository.save(newRide);
  }

  async start(riderId: number, rideId: number, payload: StartRideDto) {
    const ride = await this.rideRepository.findOne({ where: { id: rideId } });
    ride.status = enumRideStatus.IN_PROCESS;
    ride.rider = await this.getRider(riderId);
    ride.driver = await this.getEnableDriver();
    return await this.rideRepository.save(Object.assign(ride, payload));
  }

  async end(riderId: number, rideId: number, payload: EndRideDto) {
    const ride = await this.rideRepository.findOne({
      where: { id: rideId, 'rider.id': riderId } as any,
    });
    if (enumRideStatus.ENDED == ride.status) {
      throw new BadRequestException('The ride already have ended');
    }
    ride.status = enumRideStatus.ENDED;
    const result = await this.rideRepository.save(Object.assign(ride, payload));
    await this.transactionService.create(ride.id);
    return result;
  }
}

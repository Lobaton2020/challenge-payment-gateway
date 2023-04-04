import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride, enumRideStatus } from '../entities/Ride.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '@app/common/services/pagination.service';
import { Rider } from '@app/rider/entities/Rider.entity';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    private readonly paginationService: PaginationService,
  ) {}
  async create(riderId: number) {
    const rider = await this.riderRepository.findOne({
      where: { id: riderId },
    });
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    const newRide = new Ride();
    newRide.status = enumRideStatus.CREATED;
    newRide.rider = rider;
    await this.rideRepository.save(newRide);
  }
}

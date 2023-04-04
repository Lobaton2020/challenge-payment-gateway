import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  Transaction,
  enumTransactionStatus,
} from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { Ride } from '../entities/Ride.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { calculateDistanceInKilometers } from '@app/common/utils/calculateKmCoordens.util';
import { PaymentMethodService } from '@app/rider/services/payment-method.service';
import * as moment from 'moment';
import { PayloadTransaction } from '@app/common/interfaces/payment-gateway.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly paymentMethodService: PaymentMethodService,
  ) // private readonly
  {}
  async create(rideId: number) {
    const ride = await this.rideRepository.findOne({
      relations: ['rider', 'driver'],
      where: { id: rideId } as any,
    });
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    console.log(ride, JSON.stringify(ride));
    const amount = this.calculateTotalAmount(
      parseFloat(ride.start_longitud),
      parseFloat(ride.start_latitud),
      parseFloat(ride.end_longitud),
      parseFloat(ride.end_latitud),
      ride.start_ride.toISOString(),
      ride.end_ride.toISOString(),
    );
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.status = enumTransactionStatus.PENGING;
    transaction.payment_method = await this.paymentMethodService.findOne(
      ride.rider.id,
    );
    transaction.ride = ride;
    await this.transactionRepository.save(transaction);
  }
  calculateTotalAmount(
    long1: number,
    lat1: number,
    long2: number,
    lat2: number,
    date1: string,
    date2: string,
  ) {
    const KM = calculateDistanceInKilometers(lat1, long1, lat2, long2);
    Logger.log('Kilomretros recorridos: ' + KM);
    const BASE_FEE = 3500;
    const PRICE_DISTANCE = KM * 1000;
    const PRICE_PER_MINUTE = this.getMinutes(date1, date2) * 200;
    return BASE_FEE + PRICE_DISTANCE + PRICE_PER_MINUTE;
  }
  private getMinutes(date1: string, date2: string) {
    const start = moment(date1);
    const end = moment(date2);

    const duration = moment.duration(end.diff(start));
    return duration.asMinutes();
  }
  createTransaction(data: PayloadTransaction) {}
}

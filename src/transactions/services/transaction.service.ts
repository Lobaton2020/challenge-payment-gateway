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
import { IPayloadTransaction } from '@app/common/interfaces/payment-gateway.interface';
import { PaymentGatewayConsumerService } from '@app/common/services/payment-gateway-consumer.service';
import { UsersService } from '@app/auth/services/users.service';
import { RideService } from './ride.service';
import { generateRandomAlphaNumeric } from '@app/common/utils/randomAlphanumeric.util';
import { Address } from '@app/auth/entities/Address.entity';
import { Rider } from '@app/rider/entities/Rider.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly paymentGatewayConsumer: PaymentGatewayConsumerService,
    private readonly userService: UsersService,
  ) {}
  async create(rideId: number) {
    const ride = await this.rideRepository.findOne({
      relations: ['rider', 'driver'],
      where: { id: rideId } as any,
    });
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
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
    await this.createTransaction(ride.rider.id, ride, transaction);
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
  async createTransaction(
    riderId: number,
    ride: Ride,
    transaction: Transaction,
  ) {
    const rider = await this.getRider(riderId);
    const paymentMethod = (await this.paymentMethodService.findOne(
      rider.id,
    )) as any;
    const merchant = (await this.paymentGatewayConsumer.getMyMerchant()) as any;
    const user = await this.userService.findOne(rider.user.id);
    console.log(user?.addresses, JSON.stringify(user?.addresses ?? {}));
    if (!user?.addresses?.length) {
      throw new NotFoundException('Address not found');
    }
    const address = await this.addressRepository.findOne({
      where: { id: user.addresses[0]?.id },
    });
    const data: IPayloadTransaction & any = {
      amount_in_cents: parseInt(transaction.amount.toFixed(2)),
      acceptance_token: merchant.presigned_acceptance.acceptance_token,
      currency: 'COP',
      customer_email: (await this.userService.findOne(rider.user.id)).email,
      payment_method: {
        type: paymentMethod.type,
        token: paymentMethod.token,
        installments: 2,
      },
      payment_source_id: parseInt(paymentMethod.payment_source_id),
      reference: generateRandomAlphaNumeric(10),
      redirect_url: 'https://app.com/test?yes',
      customer_data: {
        full_name: user.completeName,
        phone_number: user.phone,
      },
      shipping_address: {
        address_line_1: address.address_line_1,
        address_line_2: address.address_line_2,
        country: address.country,
        region: address.region,
        city: address.city,
        name: user.completeName,
        phone_number: user.phone,
        postal_code: address.postal_code,
      },
    };
    Logger.debug('BODY FOR Transaction', data);
    await this.paymentGatewayConsumer.createTransaction(data);
  }

  async getRider(riderId) {
    const rider = await this.riderRepository.findOne({
      relations: ['user'],
      where: { id: riderId },
    });
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    return rider;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentMethod } from '../entities/PaymentMethod.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGatewayConsumerService } from '@app/common/services/payment-gateway-consumer.service';
import {
  CreatePaymentMethodCardDto,
  CreatePaymentMethodNequiDto,
} from '../dto/create-payment-method.dto';
import { enumTypePaymentSource } from '@app/common/interfaces/payment-gateway.interface';
import { UsersService } from '@app/auth/services/users.service';
import { Rider } from '../entities/Rider.entity';
import { PaginationService } from '@app/common/services/pagination.service';
import { IPagination } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    private readonly paymentGatewayConsumer: PaymentGatewayConsumerService,
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
  ) {}
  private async createPaymentMethod(
    userId: number,
    riderId: number,
    token: string,
    type: enumTypePaymentSource,
  ) {
    const merchant = (await this.paymentGatewayConsumer.getMyMerchant()) as any;
    console.log({ merchant, xx: merchant.presigned_acceptance, riderId });
    const paymentSourceId =
      (await this.paymentGatewayConsumer.createPaymentSource({
        type,
        token,
        acceptance_token: merchant.presigned_acceptance.acceptance_token,
        customer_email: (await this.userService.findOne(userId)).email,
      })) as string;
    const rider = await this.riderRepository.findOne({
      where: { id: riderId },
    });
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }

    console.log({ paymentSourceId, riderId });
    const paymentMethod = new PaymentMethod();
    paymentMethod.payment_source_id = paymentSourceId;
    paymentMethod.rider = riderId as any;
    paymentMethod.token = token;
    paymentMethod.type = type;
    await this.beforeCreateUnactivate(riderId);
    return await this.paymentMethodRepository.save(paymentMethod);
  }
  async beforeCreateUnactivate(riderId: number) {
    const patmentMethods = await this.paymentMethodRepository.find({
      rider: riderId,
    } as any);
    patmentMethods.forEach((x) => (x.status = false));
    await this.paymentMethodRepository.save(patmentMethods);
  }
  async createNequi(
    userId: number,
    riderId: number,
    createRiderDto: CreatePaymentMethodNequiDto,
  ) {
    const token = (await this.paymentGatewayConsumer.createTokenNequi(
      createRiderDto,
    )) as string;
    return await this.createPaymentMethod(
      userId,
      riderId,
      token,
      enumTypePaymentSource.NEQUI,
    );
  }

  async createCard(
    userId: number,
    riderId: number,
    createRiderDto: CreatePaymentMethodCardDto,
  ) {
    const token = (await this.paymentGatewayConsumer.createTokenCard(
      createRiderDto,
    )) as string;
    return await this.createPaymentMethod(
      userId,
      riderId,
      token,
      enumTypePaymentSource.CARD,
    );
  }

  findAll(riderId: number, page: IPagination) {
    return this.paginationService.paginate(this.paymentMethodRepository, page, {
      where: { rider: riderId },
    });
  }
}

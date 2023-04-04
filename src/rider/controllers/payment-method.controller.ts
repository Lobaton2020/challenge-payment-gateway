import { AccessRider } from '@app/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@app/auth/guards/roles.guard';
import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  CreatePaymentMethodCardDto,
  CreatePaymentMethodNequiDto,
} from '../dto/create-payment-method.dto';
import { PaymentMethodService } from '../services/payment-method.service';
import { PaginationPipe } from '@app/common/pipes/pagination.pipe';
import { IPagination } from '@app/common/interfaces/pagination.interface';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('riders/payment_methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}
  @Post('/nequi')
  @AccessRider()
  createPaymentMethodNequi(
    @Req() req,
    @Body() createPaymentMethod: CreatePaymentMethodNequiDto,
  ) {
    return this.paymentMethodService.createNequi(
      req.user.userId,
      req.user.riderId,
      createPaymentMethod,
    );
  }
  @Post('/card')
  @AccessRider()
  createPaymentMethodCard(
    @Req() req,
    @Body() createPaymentMethod: CreatePaymentMethodCardDto,
  ) {
    return this.paymentMethodService.createCard(
      req.user.userId,
      req.user.riderId,
      createPaymentMethod,
    );
  }
  @Get()
  @AccessRider()
  findAll(@Req() req, @Query(PaginationPipe) pagination: IPagination): any {
    return this.paymentMethodService.findAll(req.user.userId, pagination);
  }
}

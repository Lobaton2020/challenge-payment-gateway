import {
  Controller,
  Post,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@app/auth/guards/roles.guard';
import { AccessDriver } from '@app/auth/decorators/role.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @AccessDriver()
  @Post(':ride_id')
  create(@Param('ride_id', ParseIntPipe) rideId: number) {
    return this.transactionService.create(rideId);
  }
}

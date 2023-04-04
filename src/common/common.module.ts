import { Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';
import { PaymentGatewayConsumerService } from './services/payment-gateway-consumer.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PaginationService, PaymentGatewayConsumerService],
  exports: [PaginationService, PaymentGatewayConsumerService],
})
export class CommonModule {}

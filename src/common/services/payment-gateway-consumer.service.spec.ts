import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGatewayConsumerService } from './payment-gateway-consumer.service';

describe('PaymentGatewayConsumerService', () => {
  let service: PaymentGatewayConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentGatewayConsumerService],
    }).compile();

    service = module.get<PaymentGatewayConsumerService>(PaymentGatewayConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

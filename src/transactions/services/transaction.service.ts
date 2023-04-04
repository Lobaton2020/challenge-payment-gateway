import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  create(createTransactionDto: any) {
    return 'This action adds a new transaction';
  }
}

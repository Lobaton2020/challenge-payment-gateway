import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ICard,
  INequi,
  IPayloadTransaction,
  IPaymentSource,
  IResponsePayloadMerchant,
  IResponseTokenization,
} from '../interfaces/payment-gateway.interface';
import { PAYMENT_GATEWAY_PROVIDER } from '@app/config/constants.config';
import { IPaymentGatewayProvider } from '@app/config/app.config';
import { catchError, pluck, tap, throwError } from 'rxjs';

@Injectable()
export class PaymentGatewayConsumerService {
  private config: IPaymentGatewayProvider;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpService,
  ) {
    this.config = this.configService.get<IPaymentGatewayProvider>(
      PAYMENT_GATEWAY_PROVIDER,
    );
  }
  createTokenNequi(data: INequi) {
    return this.httpClient
      .post<IResponseTokenization>(
        `${this.config.urlApi}/tokens/nequi`,
        data,
        this.getHeaderBearer(this.config.publicKey),
      )
      .pipe(
        pluck('data'),
        pluck('data'),
        pluck('id'),
        catchError((error) => throwError(error.response.data.error)),
      )
      .toPromise();
  }
  createTokenCard(data: ICard) {
    return this.httpClient
      .post<IResponseTokenization>(
        `${this.config.urlApi}/tokens/cards`,
        data,
        this.getHeaderBearer(this.config.publicKey),
      )
      .pipe(
        pluck('data'),
        pluck('data'),
        pluck('id'),
        catchError((error) => throwError(error.response.data.error)),
      )
      .toPromise();
  }

  createPaymentSource(data: IPaymentSource) {
    return this.httpClient
      .post<IPaymentGatewayProvider>(
        `${this.config.urlApi}/payment_sources`,
        data,
        this.getHeaderBearer(this.config.privateKey),
      )
      .pipe(
        pluck('data'),
        pluck('data'),
        pluck('id'),
        catchError((error) => throwError(error.response.data.error)),
      )
      .toPromise();
  }
  getMyMerchant() {
    return this.httpClient
      .get<IResponsePayloadMerchant>(
        `${this.config.urlApi}/merchants/${this.config.publicKey}`,
      )
      .pipe(
        pluck('data'),
        pluck('data'),
        catchError((error) => throwError(error.response.data.error)),
      )
      .toPromise();
  }
  createTransaction(data: IPayloadTransaction) {
    return this.httpClient
      .post(
        `${this.config.urlApi}/transactions`,
        data,
        this.getHeaderBearer(this.config.privateKey),
      )
      .pipe(
        pluck('data'),
        tap((data) => console.log({ TRANSACTION_RESPONSE: data })),
        catchError((error) => throwError(error.response.data.error)),
      )
      .toPromise();
  }
  private getHeaderBearer(token: string) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}

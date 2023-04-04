import { registerAs, ConfigService } from '@nestjs/config';
import { APP_CONFIG, JWT_CONFIG, PAYMENT_GATEWAY_PROVIDER } from './constants.config';

interface IEnvAppConfig {
  HTTP_PORT: number;
}

export interface IJwtConfig {
  secretKey: string;
  secretKeyRefresh: string;
  expirationTime: string;
  expirationTimeRefresh: string;
}
export type IAppConfig = IEnvAppConfig & ConfigService;

export default registerAs(APP_CONFIG, () => ({
  httpPort: process.env.HTTP_PORT || 3000,
}));

export const defaultPagination = {
  limit: 100,
  page: 1,
};

export const jwtConfig = registerAs(
  JWT_CONFIG,
  (): IJwtConfig => ({
    secretKey: process.env.JWT_SECRET_KEY || 'secretKey1',
    secretKeyRefresh: process.env.JWT_SECRET_KEY_REFRESH || 'secretKeyRefresh',
    expirationTime: process.env.JWT_EXPIRATION_TIME || 'exp1',
    expirationTimeRefresh: process.env.JWT_EXPIRATION_TIME_REFRESH || 'exp2',
  }),
);

export interface IPaymentGatewayProvider {
  urlApi: string;
  publicKey: string;
  privateKey: string;
  eventKey: string;
  integrityKey: string;
}
export const paymentGatewayProvider = registerAs(
  PAYMENT_GATEWAY_PROVIDER,
  (): IPaymentGatewayProvider => ({
    urlApi: process.env.URL_API,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    eventKey: process.env.EVENT_KEY ,
    integrityKey: process.env.INTEGRITY__KEY ,
  }),
);

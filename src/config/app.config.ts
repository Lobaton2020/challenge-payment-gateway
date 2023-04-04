import { registerAs, ConfigService } from '@nestjs/config';
import { APP_CONFIG, JWT_CONFIG } from './constants.config';

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

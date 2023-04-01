import { registerAs } from '@nestjs/config';
import { APP_CONFIG } from './constants.config';

export interface IEnvAppConfig {
  port: number;
  database: {
    type: any;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}
export default registerAs(APP_CONFIG, () => ({
  port: process.env.PORT || 3000,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
}));

export const defaultPagination = {
  limit: 100,
  page: 1,
};

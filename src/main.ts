import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { IAppConfig } from './config/app.config';
import { DEV_KEY, HTTP_PORT } from './config/constants.config';
/**
 * TODO:
 * 1.Discover the command for generate migrations from a Models.
 */
const configForDevDatabase = () => {
  const data = require('./config/database.config').default();
  require('fs').writeFileSync('ormconfig.json', JSON.stringify(data, null, 4));
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<IAppConfig>(ConfigService);
  if (process.env.NODE_ENV === DEV_KEY) {
    configForDevDatabase();
  }
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Payment Gateway')
    .setDescription('API for managament of riders and drivers')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.setGlobalPrefix('api/v1');
  SwaggerModule.setup(
    'api/v1/docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );
  await app.listen(config.get(HTTP_PORT));
}
bootstrap();

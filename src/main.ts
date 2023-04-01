import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { IEnvAppConfig } from './config/app.config';
import { APP_CONFIG } from './config/constants.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
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
  await app.listen(config.get<IEnvAppConfig>(APP_CONFIG).port);
}
bootstrap();

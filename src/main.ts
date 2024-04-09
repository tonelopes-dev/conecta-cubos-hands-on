import 'dotenv/config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Meetup Comunicubos')
    .setDescription(
      'This platform will provide students with the necessary means to create, manage and publicize their events efficiently, thus expanding the breadth and impact of the initiatives developed by our academic community.',
    )
    .setVersion('1.0')
    .addTag('API Documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();

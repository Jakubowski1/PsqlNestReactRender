import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Clinic API')
    .setDescription('API for managing doctors, patients, schedules, and appointments')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    Logger.log('Application is running on: http://localhost:3000', 'Bootstrap');
    Logger.log('Swagger documentation is available on: http://localhost:3000/api', 'Bootstrap');
  });
}
bootstrap();

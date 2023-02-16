import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Só sera passado adiante o que estiver maepado
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true, // Se alguma propriedade naõ foi listada e esta sendo passda dispara erro
    }),
  );
  await app.listen(3000);
}
bootstrap();

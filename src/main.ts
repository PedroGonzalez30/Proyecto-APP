import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(); 
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

   //imagenes/ como archivos estaticos
  app.useStaticAssets(join(process.cwd(), 'imagenes'), {
  prefix: '/imagenes',
});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

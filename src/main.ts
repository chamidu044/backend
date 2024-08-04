import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3001', // your client app origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }));
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();

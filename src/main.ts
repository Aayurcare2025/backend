import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
    const app = await NestFactory.create(AppModule,{cors:true});
//  await app.listen(5000);
 app.enableCors({
    origin: 'https://www.aayurcare.com',  // frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
 await app.listen(5000, '0.0.0.0');
 
}

bootstrap();

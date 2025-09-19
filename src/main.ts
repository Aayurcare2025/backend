import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
    const app = await NestFactory.create(AppModule,{cors:true});
//  await app.listen(5000);
 await app.listen(5000, '0.0.0.0');
 
}

bootstrap();

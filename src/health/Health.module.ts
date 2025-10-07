import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Health } from './Health.entity';
// import { HealthService } from './Health.service';
// import { HealthController } from './Health.controller';



// import { HealthController } from './health.controller';


@Module({
  imports:[TypeOrmModule.forFeature([Health]),],
  providers: [],
  controllers:[],
  exports:[],
})
export class HealthModule {}

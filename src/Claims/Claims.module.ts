import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Claims } from './Claims.entity';
import { ClaimsService } from './Claims.service';
import { ClaimsController } from './Claims.controller';


@Module({
  imports:[TypeOrmModule.forFeature([Claims]),
],
  providers: [ClaimsService],
  controllers:[ClaimsController],
  exports:[ClaimsService],
})
export class ClaimsModule {}

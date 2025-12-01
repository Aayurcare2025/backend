  // async applyInsurance(insuranceDto: InsuranceDto): Promise<Insurance> {
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Claims } from './Claims.entity';
import { ClaimsService } from './Claims.service';
import { ClaimsController } from './Claims.controller';
import { MailService } from './Mail.Service';




@Module({
  imports:[TypeOrmModule.forFeature([Claims]),
],
  providers: [ClaimsService,MailService],
  controllers:[ClaimsController],
  exports:[ClaimsService,MailService],
})
export class ClaimsModule {}

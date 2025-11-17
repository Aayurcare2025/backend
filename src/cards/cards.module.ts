  // async applyInsurance(insuranceDto: InsuranceDto): Promise<Insurance> {
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Cards]),
],
  providers: [CardService],
  controllers:[CardController],
  exports:[CardService],
})
export class CardsModule {}

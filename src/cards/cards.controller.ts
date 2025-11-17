import { Body, Controller, Post } from '@nestjs/common';
import { CardService } from './cards.service';
import { Cards } from './cards.entity';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('generate')
  async generate(@Body() dto: Cards) {
    return this.cardService.generateCard(dto);
  }
}

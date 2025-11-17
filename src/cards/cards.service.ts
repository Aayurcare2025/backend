import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cards } from './cards.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
  ) {}

  async generateCard(dto: Cards) {
    const { name, plan } = dto;

    // Step 1: Generate card number
    const prefix = '400000';
    const baseNumber = prefix + Math.floor(100000000 + Math.random() * 900000000);
    const cardNumber = this.generateLuhnNumber(baseNumber.toString());

    // Step 2: Mask number
    const last4 = cardNumber.slice(-4);
    const masked = `**** **** **** ${last4}`;

    // Step 3: Expiry
    const months = plan.toLowerCase() === 'premium' ? 24 : 12;
    const expiryDate = this.calculateExpiryDate(months);
    const expiryDisplay = this.formatExpiryMMYY(expiryDate);

    // Step 4: Create a new card entity
    const newCard = this.cardRepository.create({
      name,
      plan,
      cardNumber,
      maskedNumber: masked,
      expiry: expiryDisplay,
    });

    // Step 5: Save to database ✅
    const savedCard = await this.cardRepository.save(newCard);

    // Step 6: Generate SVG card
    const svgCard = this.generateSvgCard(name, masked, expiryDisplay);

    return {
      message: 'Card generated successfully',
      ...savedCard,
      svgCard,
    };
  }

  // 🧩 Luhn algorithm for valid card number
  private generateLuhnNumber(baseNumber: string): string {
    let sum = 0;
    let shouldDouble = false;

    for (let i = baseNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(baseNumber[i], 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return baseNumber + checkDigit;
  }

  private calculateExpiryDate(months: number): Date {
    const now = new Date();
    now.setMonth(now.getMonth() + months);
    return now;
  }

  private formatExpiryMMYY(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${yy}`;
  }

  private generateSvgCard(name: string, number: string, expiry: string): string {
    return `
    <svg width="340" height="210" xmlns="http://www.w3.org/2000/svg">
      <rect rx="15" width="100%" height="100%" fill="url(#grad)" />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#005bea"/>
          <stop offset="100%" stop-color="#00c6fb"/>
        </linearGradient>
      </defs>
      <text x="20" y="80" font-size="18" fill="#fff">${number}</text>
      <text x="20" y="130" font-size="14" fill="#fff">${name}</text>
      <text x="260" y="130" font-size="14" fill="#fff">${expiry}</text>
    </svg>`;
  }
}

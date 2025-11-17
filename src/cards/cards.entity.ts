import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Cards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  plan: string;

  @Column()
  cardNumber: string;

  @Column()
  maskedNumber: string;

  @Column()
  expiry: string;

  @CreateDateColumn()
  createdAt: Date;
}

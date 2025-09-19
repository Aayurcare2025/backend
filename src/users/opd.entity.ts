import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Opd extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  plan:string;


 @Column({ type: 'int', nullable: true })
  Sum_Insured:number;

 @Column({ type: 'int', nullable: true })
  premium:number;


  



  

}

  

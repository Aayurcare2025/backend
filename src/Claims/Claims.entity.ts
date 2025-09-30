import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Claims{
 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name:string;

  @Column()
  PhoneNumber:number;

  @Column()
  Email:string;

  //select aadharcard,pan card,driving license,passport
  @Column()
  kycdocument:string;



  //select consultation,prescription,radiology,pathology
  @Column()
  ConsultationType:string


  @Column()
  FileUpload:File;







}
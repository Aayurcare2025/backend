import { IsEnum } from "class-validator";
import multer, { Multer } from "multer";
import { UserRole } from "src/enum/role.enum";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
@Entity({ name: 'health' })
export class Health extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buy:string;

  @Column()
  ensure:string;

  @Column()
  pincode:number;

  @Column()
  gender:string;

  @Column()
  age:number;

  @Column()
  email:string;

  // @Column()
  // // @Column({ type: 'bigint' })
  // @Column({ type: 'varchar', length: 15})
  // phonenumber:string;

  //proposal details:

  @Column()
  firstName:string;


  @Column()
  lastName:string;

  @Column()
  dd_mm_yy:Date;

  // @Column()
// @Column({ type: 'bigint' })
@Column({ type: 'varchar', length: 15})
  mobile_number:string;

  @Column()
  oocupation:string;

  // @Column()
  // file_upload:string;


  @Column({ type: "mediumblob", nullable: true })
file_upload: Buffer;

  @Column()
  nominee_name:string;


  @Column()
  dd_mm_yyyy:Date;

  @Column()
  relation:string;


  @Column()
  selectedopdvalue:number;


  @Column()
  selectedipdvalue:number;

  @Column()
  selectedaccidentvalue:number;





  




}  //still same issue phonenumber has a default vaue

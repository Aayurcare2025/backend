// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Claims{
//  @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   Name:string;

//   @Column()
//   PhoneNumber:number;

//   @Column()
//   Email:string;

//   //select aadharcard,pan card,driving license,passport
//   @Column()
//   kycdocument:string;



//   //select consultation,prescription,radiology,pathology
//   @Column()
//   ConsultationType:string


//   @Column()
//   FileUpload:File;







// }

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"claims"})
export class Claims
{

@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@Column()
phonenumber:string;


@Column({nullable:true})
emailid:string;

@Column()
kycdocument:string;

@Column()
consultationtype:string; 

@Column({ type: 'text', nullable: true })
  file_upload: string;


@Column()
accountHolderName:string;


@Column()
bankAccountNumber:string

@Column()
reEnterAccountNumber:string;


@Column()
IFSCCode:string;

@Column()
BankName:string;

@Column()
BankBranchName:string;




}
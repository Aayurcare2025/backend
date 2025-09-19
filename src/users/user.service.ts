import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/enum/role.enum';
import { User } from './user.entity';
import { Data1 } from './data.entity';
import { Data2 } from './data2.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Data1)
        private readonly data1Repository:Repository<Data1>,
        @InjectRepository(Data2)
        private readonly data2Repository:Repository<Data2>,
      
      ) {}
      async findOne(username: string): Promise<User | undefined> {
  const user = await this.userRepository.findOne({ where: { username: username } });
  return user ?? undefined;  // converts null → undefined
}

// async userregister(userregister: Userdto): Promise<User> {
//   // Check if username already exists
//   const existingUser = await this.userRepository.findOne({
//     where: { username: userregister.username },
//   });
//   if (existingUser) {
//     throw new Error('Username already exists. Please choose a different one.');
//   }
//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedpassword = await bcrypt.hash(userregister.password, salt);

//     const user = new User();
//     user.username = userregister.username;
//     user.password = hashedpassword;
//     user.role = userregister.role || UserRole.USER

//     await user.save(); 
    

//     const { password, ...rest } = user;
//     return rest as User;
//   } catch (error) {
//     if (
     
//       error.code === 'ER_DUP_ENTRY' || 
//       (error.message && error.message.includes('Duplicate entry'))
//     ) {
//       throw new Error('Username already exists. Please choose a different one.');
//     }
//     throw error;
//   }
// }

async userregister(userRegister: UserDto): Promise<Partial<User>> {
  // Check if username exists
  const existingUser = await this.userRepository.findOne({
    where: { username: userRegister.username },
  });
  if (existingUser) {
    throw new Error("Username already exists. Please choose a different one.");
  }

  // Check password == confirmPassword
  if (userRegister.password !== userRegister.confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userRegister.password, salt);

  // Create user
  const user = new User();
  user.fullName = userRegister.fullName;
  user.email = userRegister.email;
  user.username = userRegister.username;
  user.password = hashedPassword;

  user.role = userRegister.role || UserRole.USER;

  await user.save();

  // Return user without password
  // const { password, confirmPassword, ...rest } = user;
  const { password, ...rest } = user;
  return rest;
}


  // async applyInsurance(insuranceDto: InsuranceDto): Promise<Insurance> {
  //   try {
  //     const newInsurance = this.insuranceRepository.create(insuranceDto);
  //     return await this.insuranceRepository.save(newInsurance);
  //   } catch (err) {
  //     console.log("error",err);
  //     throw new BadRequestException('Failed to apply for insurance');
  //   }
  // }
  // user.service.ts


async saveExcelData(data: any[]): Promise<any> {
  // const savedUsers = [];
 const savedUsers: Data1[] = [];
  for (const row of data) {
    const { IPD,Accident,OPD,Total_sum_insured,Age_less_than_equal_to_20_yrs,Age_is_21_to_35_yrs,Age_is_36_to_45_yrs,
      Age_is_46_to_55_yrs,Age_is_56_to_60_yrs,Age_is_61_to_70_yrs,Age_is_71_to_80_yrs,Age_is_above_80_yrs
    } = row;

    // if (!name || !age || !gender) continue; // skip invalid rows

    // if(!IPD || Accident ||OPD ||Total_sum_insured || Age_less_than_equal_to_20yrs 
    //   ||Age_is_21_35_yrs ||Age_is_36_45_yrs ||Age_is_46_55_yrs ||Age_is_56_60yrs
    //   ||Age_is_61_70_yrs ||Age_is_71_80_yrs  ||Age_is_above_80_yrs
    // )continue;

    const data1 = new Data1();
    // data1.name = name;
    // data1.age = Number(age);
    // data1.gender = gender;
    data1.IPD=IPD;
    data1.Accident=Accident;
    data1.OPD=OPD;
    data1.Total_sum_insured=Total_sum_insured;
    data1.Age_less_than_equal_to_20_yrs=Age_less_than_equal_to_20_yrs;
    data1.Age_is_21_to_35_yrs=Age_is_21_to_35_yrs;
    data1.Age_is_36_to_45_yrs=Age_is_36_to_45_yrs
    data1.Age_is_46_to_55_yrs=Age_is_46_to_55_yrs;
    data1.Age_is_56_to_60_yrs=Age_is_56_to_60_yrs;
    data1.Age_is_61_to_70_yrs=Age_is_61_to_70_yrs;
    data1.Age_is_71_to_80_yrs=Age_is_71_to_80_yrs;
    data1.Age_is_above_80_yrs=Age_is_above_80_yrs
    await this.data1Repository.save(data1);
    savedUsers.push(data1);
  }
  return { message: 'Excel data saved successfully', saved: savedUsers.length };
}



async saveExcelData2(data: any[]): Promise<any> {

  // const savedUsers = [];
 const savedUsers: Data1[] = [];
  for (const row of data) {
    const { IPD,Accident,Total_sum_insured,Age_less_than_equal_to_20_yrs,Age_is_21_to_35_yrs,Age_is_36_to_45_yrs,
      Age_is_46_to_55_yrs,Age_is_56_to_60_yrs,Age_is_61_to_70_yrs,Age_is_71_to_80_yrs,Age_is_above_80_yrs
    } = row;
    const data1 = new Data1();
   
    data1.IPD=IPD;
    data1.Accident=Accident;
   
    data1.Total_sum_insured=Total_sum_insured;
    data1.Age_less_than_equal_to_20_yrs=Age_less_than_equal_to_20_yrs;
    data1.Age_is_21_to_35_yrs=Age_is_21_to_35_yrs;
    data1.Age_is_36_to_45_yrs=Age_is_36_to_45_yrs
    data1.Age_is_46_to_55_yrs=Age_is_46_to_55_yrs;
    data1.Age_is_56_to_60_yrs=Age_is_56_to_60_yrs;
    data1.Age_is_61_to_70_yrs=Age_is_61_to_70_yrs;
    data1.Age_is_71_to_80_yrs=Age_is_71_to_80_yrs;
    data1.Age_is_above_80_yrs=Age_is_above_80_yrs
    await this.data2Repository.save(data1);
    savedUsers.push(data1);
  }
  return { message: 'Excel data saved successfully', saved: savedUsers.length };
}
  async getInsurance(ipd?: number, accident?: number, opd?: number, age?: number) {
    if (age === undefined) throw new BadRequestException('Age is required');

    const query = this.data1Repository.createQueryBuilder('data');

    if (ipd !== undefined) query.andWhere('data.IPD = :ipd', { ipd });
    if (accident !== undefined) query.andWhere('data.Accident = :accident', { accident });
   

    const data = await query.getOne();
  
    if (!data) throw new BadRequestException('No matching data found');

    let premium: number | null = null;

    if (age <= 20) premium = data.Age_less_than_equal_to_20_yrs;
    else if (age <= 35) premium = data.Age_is_21_to_35_yrs;
    else if (age <= 45) premium = data.Age_is_36_to_45_yrs;
    else if (age <= 55) premium = data.Age_is_46_to_55_yrs;
    else if (age <= 60) premium = data.Age_is_56_to_60_yrs;
    else if (age <= 70) premium = data.Age_is_61_to_70_yrs;
    else if (age <= 80) premium = data.Age_is_71_to_80_yrs;
    else premium = data.Age_is_above_80_yrs;

    return {
      total_sum_insured: data.Total_sum_insured,
      premium,
    };
  }
   

  async getInsurance2(ipd?: number, accident?: number, age?: number) {
    if (age === undefined) throw new BadRequestException('Age is required');

    const query = this.data2Repository.createQueryBuilder('data');

    if (ipd !== undefined) query.andWhere('data.IPD = :ipd', { ipd });
    if (accident !== undefined) query.andWhere('data.Accident = :accident', { accident });
   

    const data = await query.getOne();
  
    if (!data) throw new BadRequestException('No matching data found');

    let premium: number | null = null;

    if (age <= 20) premium = data.Age_less_than_equal_to_20_yrs;
    else if (age <= 35) premium = data.Age_is_21_to_35_yrs;
    else if (age <= 45) premium = data.Age_is_36_to_45_yrs;
    else if (age <= 55) premium = data.Age_is_46_to_55_yrs;
    else if (age <= 60) premium = data.Age_is_56_to_60_yrs;
    else if (age <= 70) premium = data.Age_is_61_to_70_yrs;
    else if (age <= 80) premium = data.Age_is_71_to_80_yrs;
    else premium = data.Age_is_above_80_yrs;

    return {
      total_sum_insured: data.Total_sum_insured,
      premium,
    };
  }
}






  import { BadRequestException, Injectable } from '@nestjs/common';


  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Health } from './Health.entity';


//
  @Injectable()
  export class HealthService {
      constructor(
          @InjectRepository(Health)
          private readonly HealthRepository: Repository<Health>,
        
        
      ) {}



  //        async saveInsurance(insuranceData: any) {
  //     // here you can save to DB
  //     // e.g., save proposer, nominee, plan details, premium, etc.
  //     console.log("Received Insurance Data:", insuranceData);

  //     return {
  //       message: 'Insurance proposal saved successfully',
  //       data: insuranceData,
  //     };
  //   }
      
  
  //whats the iss

  async createData(payload: any): Promise<Health> {
    const nomineedob = payload.dd_mm_yyyy ? new Date(payload.dd_mm_yyyy) : new Date(); // default to today
      const health = this.HealthRepository.create({
        buy: payload.product,
        ensure: payload.insured,
        pincode: payload.pincode, 
        gender: payload.formData?.proposer?.gender,
        age: payload.age,
        email: payload.email,
        phonenumber:String(payload.phonenumber),
        // phonenumber: payload.phonenumber,
        firstName: payload.formData?.proposer?.firstName,
        lastName: payload.formData?.proposer?.lastName,
        dd_mm_yy: payload.formData?.proposer?.dob,
        mobile_number: payload.formData?.proposer?.mobile,
        oocupation: payload.formData?.proposer?.occupation,
        // file_upload: payload.files, // handle separately (multer)
      // file_upload: payload.fileBuffer, // save buffer in DB
        file_upload: payload.filePath, 
        nominee_name: payload.formData?.nominee?.name,
        dd_mm_yyyy: nomineedob,
        relation: payload.formData?.nominee?.relation,
        selectedopdvalue: payload.OPDValue,
        selectedipdvalue: payload.IPDValue,
        selectedaccidentvalue: payload.AccidentValue,
      });

      return await this.HealthRepository.save(health);
    }






  


  }


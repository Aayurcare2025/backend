


// import {
//   BadRequestException, Body, Controller, Post, UnauthorizedException, ValidationPipe, UploadedFile,
//   UseInterceptors,
//   Get,
//   Query,
//   Param,
// } from "@nestjs/common";
// import { HealthService } from "./Health.service";
// import { Health } from "./Health.entity";
// import { diskStorage, memoryStorage } from 'multer';
// //data

// export const multerConfig = {
//   storage: memoryStorage(), // keep files in memory as Buffer
// };

// @Controller('health')
// export class HealthController {
//   constructor(private healthservice: HealthService,
   
//   ) { }

//    @Post('apply')
//   async apply(@Body() payload: any): Promise<Health> {
//     return this.healthservice.createData(payload);
//   }

 








// }



import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
} from "@nestjs/common";
import { HealthService } from "./Health.service";
import { Health } from "./Health.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { Response } from "express";

// Multer config to keep files in memory as Buffer
export const multerConfig = {
  storage: memoryStorage(),
};

@Controller("health")
export class HealthController {
  constructor(private healthservice: HealthService) {}

  

 

  // 👉 get file back from DB
//   @Get(":id/file")
//   async getFile(@Param("id") id: number, @Res() res: Response) {
//     const health = await this.healthservice.findOne(id);
//     if (!health?.file_upload) {
//       throw new BadRequestException("File not found");
//     }

//     res.setHeader("Content-Type", "application/pdf"); // or detect mime-type dynamically
//     res.send(health.file_upload);
//   }




@Post("apply")
@UseInterceptors(FileInterceptor("file", multerConfig))
async apply(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any
): Promise<Health> {
  let parsedFormData = {};
  try {
    parsedFormData = JSON.parse(body.formData); // parse JSON string back
  } catch (e) {}

  return this.healthservice.createData({
    ...body,
    formData: parsedFormData,
    fileBuffer: file ? file.buffer : null,
  });
}

}


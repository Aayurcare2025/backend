


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
// import { memoryStorage } from "multer";
import { Response } from "express";
import * as os from "os";
import { diskStorage } from "multer";
import { extname } from "path";
import { join } from "path";

// Multer config to keep files in memory as Buffer
// export const multerConfig = {
//   storage: memoryStorage(),
// };
// const documentsPath = join(os.homedir(), "Documents");

export const multerConfig = {
  storage: diskStorage({
    destination: `${os.homedir()}/Documents`, // <-- local folder
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

@Controller("health")
export class HealthController {
  constructor(private healthservice: HealthService) {}

  

  //   // pass file.buffer to service
  //   return this.healthservice.createData({
  //     ...payload,
  //     fileBuffer: file.buffer,
  //   });
  // }

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


    // Save file path instead of buffer
    const filePath = file ? file.path : null;
  return this.healthservice.createData({
    ...body,
    formData: parsedFormData,
    // fileBuffer: file ? file.buffer : null,
     filePath,
  });
}

}


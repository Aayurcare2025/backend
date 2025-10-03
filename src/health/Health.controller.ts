import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { HealthService } from "./Health.service";
import { Health } from "./Health.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });




if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS credentials or region not set in environment variables");
}


const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


@Controller("health")
export class HealthController {
  constructor(private readonly healthservice: HealthService) {}

  @Post("apply")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async apply(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any
  ): Promise<Health> {
    let parsedFormData = {};
    try { parsedFormData = JSON.parse(body.formData); } catch (e) {}

    let s3FileUrl: string | null = null;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const bucketName = process.env.AWS_BUCKET_NAME;
      const region = process.env.AWS_REGION;

      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      s3FileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    }

    return this.healthservice.createData({
      ...body,
      formData: parsedFormData,
      filePath: s3FileUrl,
    });
  }
}

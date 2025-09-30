


import {
  BadRequestException, Body, Controller, Post, UnauthorizedException, ValidationPipe, UploadedFile,
  UseInterceptors,
  Get,
  Query,
  Param,
} from "@nestjs/common";
import { HealthService } from "./Health.service";
import { Health } from "./Health.entity";

//data

@Controller('health')
export class HealthController {
  constructor(private healthservice: HealthService,
   
  ) { }

   @Post('apply')
  async apply(@Body() payload: any): Promise<Health> {
    return this.healthservice.createData(payload);
  }

 








}


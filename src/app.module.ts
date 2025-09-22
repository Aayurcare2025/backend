
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { typeOrmconfigAsync } from './typeorm.config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { Module } from '@nestjs/common';
// import { ConfigModule } from "@nestjs/config";
// import { User } from './users/user.entity';
// import { UsersModule } from './users/user.module';
// import { Data1 } from './users/data.entity';
// import { Opd } from './users/opd.entity';



// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     AuthModule, UsersModule,
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'Namb@0253',
//       database: 'aayurcare',
//       entities: [User,Data1,Opd],
//       autoLoadEntities: true,
//       synchronize: true
//     }),
//     // TypeOrmModule.forRootAsync(typeOrmconfigAsync)
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { Data1 } from './users/data.entity';
import { Opd } from './users/opd.entity';
import { Data2 } from './users/data2.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // makes env vars available everywhere
    }),
    AuthModule, 
    UsersModule,

    // ✅ Use ConfigService for DB settings
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
      port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Data1,Data2, Opd],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

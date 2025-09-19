// import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from '../auth.service';
// import { JwtPayload } from '../interface/jwt-payload.interface';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService,
//     private readonly configService: ConfigService
//   ) {
//     super({
      
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       // secretOrKey: configurationService.get("JWT_KEY"),
//       // secretOrKey: 'secretKey',
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }

//   async validate(payload: JwtPayload) {
//     // console.log("User ",)
//     const user = await this.authService.validateUser(payload);
//     // console.log("User ",user)
//     if (user.status != HttpStatus.OK) {
//       throw new UnauthorizedException();
//     }
//     // return jwtpayload , not the user
//     return payload;
//   }
// }



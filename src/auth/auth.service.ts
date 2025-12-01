import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/user.service';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private configService: ConfigService,
        private jwtService: JwtService) { }

    async signIn(email: string, password: string): Promise<any> {
        console.log("Creds ", email, password)
        const user = await this.usersService.findOne(email);
        if (!user) {
            throw new HttpException(
                "Invalid Username",
                HttpStatus.NOT_FOUND,
            );
        }

        console.log(user);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch);

        if (!isMatch) {
            throw new HttpException(
                "Incorrect Password",
                HttpStatus.UNAUTHORIZED,
            );
        }


        
        const payload = { id: user.id, email: user.email, role:user.role };

        const accessToken = this.jwtService.sign(payload, { expiresIn: this.configService.get("EXPIRES_IN") });
        return {
            access_token:accessToken
        };
    }
}

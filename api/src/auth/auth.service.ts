import {Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {LoginDto} from './dto/login.dto';
import * as argon2 from 'argon2';
import {JwtService} from '@nestjs/jwt';
import {LoginResponseDto} from './dto/login.response.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY'; // TODO env

    async login(body: LoginDto): Promise<LoginResponseDto> {
        // find user with email
        const userExists = await this.userService.findOneByEmail(body.email);

        if (!userExists) {
            throw new NotFoundException('Email or password is wrong');
        }

        // compare passwords
        const passwordMatch = await argon2.verify(userExists.password, body.password);

        if (!passwordMatch) {
            throw new NotFoundException('Email or password is wrong');
        }

        // generate and return token
        const payload = {username: userExists.email, sub: userExists.id};

        return {
            user: {
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                email: userExists.email,
            },
            accessToken: this.jwtService.sign(payload),
        };
    }
}

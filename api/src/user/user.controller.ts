import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {RegisterUserDto} from './dto/register.user.dto';
import {UserResponseDto} from './dto/user.response.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Post('register-user')
    async register(@Body() body: RegisterUserDto): Promise<UserResponseDto> {
        return this.userService.registerUser(body);
    }

}

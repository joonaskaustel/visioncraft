import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {
    }

    // @Get('login')
    // login() {
    //
    //     // initiates the Google OAuth2 login flow
    // }



}

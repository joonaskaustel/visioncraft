import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
    ) {
    }

    private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY'; // <- replace this with your secret key


}

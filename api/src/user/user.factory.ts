import {UserEntity} from './user.entity';
import {RegisterUserDto} from './dto/register.user.dto';
import * as argon2 from 'argon2';

export class UserFactory {
    public async newUser(user: RegisterUserDto) {
        const newUser = new UserEntity();

        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.password = await argon2.hash(user.password);

        return newUser;
    }
}

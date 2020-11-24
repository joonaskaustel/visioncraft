import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {RegisterUserDto} from './dto/register.user.dto';

@Injectable()
export class UserService {
    private alias = 'u';

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {
    }

    // async createQueryBuilder(): Promise<SelectQueryBuilder<UserEntity>> {
    //     return await getRepository(UserRepository).createQueryBuilder(`${this.alias}`);
    // }

    async registerUser(body: RegisterUserDto) {
        // todo: check if email aready exhists


        // create user
        const newUser = new UserEntity();

        newUser.email = body.email;
        newUser.password = body.password;

        return await this.usersRepository.save(newUser);
    }
}

import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {RegisterUserDto} from './dto/register.user.dto';
import {UserFactory} from './user.factory';
import {UserResponseDto} from './dto/user.response.dto';

@Injectable()
export class UserService{
    private alias = 'u';

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private userFactory: UserFactory,
    ) {
    }

    findOneByEmail(email: string): Promise<UserEntity> {
        return this.usersRepository.findOne({ email });
    }

    async registerUser(body: RegisterUserDto) {
        // check if email aready exhists
        const userExists = await this.findOneByEmail(body.email);

        if (userExists) {
            throw new ConflictException('User with this email exists');
        }

        // use factory for better organization
        const newUser = await this.userFactory.newUser(body);

        // return only neede values from dto
        return UserResponseDto.fromUser(await this.usersRepository.save(newUser));
    }
}

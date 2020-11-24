import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';
import {UserRepository} from './user.repository';
import {UserController} from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {
}

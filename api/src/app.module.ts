import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user/user.entity';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'visioncraft',
            entities: [UserEntity],
            synchronize: true,
        }),
        AuthModule,
        UserModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}

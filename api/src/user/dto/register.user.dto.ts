import {IsEmail, IsNotEmpty, IsString, Length, MinLength, ValidateIf} from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @ValidateIf((user) => user.confirmPassword !== user.password)
    @Length(1, 0, { message: 'The two provided passwords are different!' }) // a bit hacky but should work
    confirmPassword: string;
}

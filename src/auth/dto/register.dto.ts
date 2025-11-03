import { IsString, IsNumber, Min, MinLength, IsArray, IsEmail } from 'class-validator';

export class RegisterDto {

    @IsString()
    username: string;

    @IsEmail()
    //@MinLength(5)
    email: string;

    @IsString()
    //@Min(5)
    password: string;

}
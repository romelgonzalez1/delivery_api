import { IsString, IsNumber, Min, MinLength, IsArray } from 'class-validator';

export class RegisterDto {

    @IsString()
    username: string;

    @IsString()
    //@MinLength(5)
    email: string;

    @IsString()
    //@Min(5)
    password: string;

}
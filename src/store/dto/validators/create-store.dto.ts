import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateStoreDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsString()
    @MinLength(3)
    image: string;
}

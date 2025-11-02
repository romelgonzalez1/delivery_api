import { IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdateStoreDto {
    @IsString()
    @MinLength(2)
    @IsOptional()
    name: string;

    @IsString()
    @MinLength(10)
    @IsOptional()
    description: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    image: string;
}

import { IsString, MinLength } from 'class-validator';

export class GetProductByIdDto {
    @IsString()
    @MinLength(2)
    id: string;
}
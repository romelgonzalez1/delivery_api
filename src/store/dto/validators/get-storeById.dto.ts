import { IsString, MinLength } from 'class-validator';

export class GetStoreByIdDto {
    @IsString()
    @MinLength(2)
    id: string;
}
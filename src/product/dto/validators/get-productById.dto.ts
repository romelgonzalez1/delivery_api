import { IsString, IsUUID, MinLength } from 'class-validator';

export class GetProductByIdDto {
    @IsUUID()
    id: string;
}
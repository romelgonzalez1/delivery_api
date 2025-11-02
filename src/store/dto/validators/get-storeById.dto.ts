import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class GetStoreByIdDto {
    @IsUUID()
    id: string;
}
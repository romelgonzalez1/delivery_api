import { IsNumber, IsString, IsUUID, Min, MinLength } from 'class-validator';

export class CreateStoreProductDto {
    @IsUUID()
    @MinLength(2)
    productId: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;
}

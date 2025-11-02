import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPaginatedStoresDto {
    @ApiPropertyOptional({
        description: 'Número de página',
        default: 1,
        type: Number,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({
        description: 'Cantidad de elementos por página',
        default: 10,
        type: Number,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number = 10;

    @ApiPropertyOptional({
        description: 'Término de búsqueda por nombre de la tienda',
        type: String,
    })
    @IsOptional()
    @IsString()
    q?: string;
}
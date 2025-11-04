import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetPaginatedStoresProductsDto {
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
        description: 'Término de búsqueda por nombre de los productos en la tienda',
        type: String,
    })
    @IsOptional()
    @IsString()
    q?: string

    @ApiPropertyOptional({
        description: 'Filtrar por productos en stock. Acepta "true" o "false".',
        type: Boolean,
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        return value; // Devuelve el valor original si no es 'true' ni 'false'
    })
    @IsBoolean({ message: 'inStock must be a boolean value (true or false)' }) // <-- 3. El validador ahora funciona
    inStock?: boolean;
}
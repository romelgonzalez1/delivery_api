import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query, Put } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { CreateStoreDto } from '../dto/validators/create-store.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/guard.service';
import { UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateStoreService } from '../services/create-store';
import { StoreRepository } from '../repository/postgres/store.repository';
import { GetStoreByIdService } from '../services/get-storeById';
import { GetPaginatedStoresService } from '../services/get-paginatedStores';
import { GetStoreByIdDto } from '../dto/validators/get-storeById.dto';
import { GetPaginatedStoresDto } from '../dto/validators/get-paginated-stores.dto';
import { UpdateStoreService } from '../services/update-store';
import { UpdateStoreDto } from '../dto/validators/update-store.dto';
import { DeleteStoreService } from '../services/delete-store';

@ApiTags('Stores')
@ApiBearerAuth('JWT-auth')
@Controller('stores')
export class StoreController {
    private readonly storeRepository: StoreRepository;

    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
        this.storeRepository = new StoreRepository(this.dataSource)
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async findStoreById(@Param(new ValidationPipe({ transform: true })) params: GetStoreByIdDto) {
        const service = new GetStoreByIdService(this.storeRepository);
        const result = await service.execute(params);

        if (!result.isSuccess()) {
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }

        return result.Value;
    }

    @Get()
    @ApiOperation({ summary: 'Obtener un listado de tiendas con paginación y búsqueda' })
    async findStores(@Query(new ValidationPipe({ transform: true })) getPaginatedStoresDto: GetPaginatedStoresDto) {
        
        const service = new GetPaginatedStoresService(this.storeRepository);
        const result = await service.execute(getPaginatedStoresDto);

        if (!result.isSuccess()) {
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }

        return result.Value;
    }

    @Post()
    async createStore(@Body() createStoreDto: CreateStoreDto) {
        const service = new CreateStoreService(this.storeRepository);
        const result = await service.execute(createStoreDto);

        if (!result.isSuccess()) {
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }
        
        return result.Value;
    }

    @Put('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async updateStore(@Param(new ValidationPipe({ transform: true })) params: GetStoreByIdDto, @Body() updateStoreDto: UpdateStoreDto) {
        const service = new UpdateStoreService(this.storeRepository);
        const result = await service.execute({ ...updateStoreDto, id: params.id });

        if (!result.isSuccess()) {
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }

        return result.Value;
    }

    @Delete('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async deleteStore(@Param(new ValidationPipe({ transform: true })) params: GetStoreByIdDto) {
        const service = new DeleteStoreService(this.storeRepository);
        const result = await service.execute(params);

        if (!result.isSuccess()) {
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }

        return result.Value;
    }
}
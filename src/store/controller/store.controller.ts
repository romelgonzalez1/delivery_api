import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
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
import { ImageUrlGenerator } from 'src/core/image.url.generator/image.url.generator';

@ApiTags('Stores')
@ApiBearerAuth('JWT-auth')
@Controller('stores')
export class StoreController {
    private readonly storeRepository: StoreRepository;
    private readonly imageUrlGenerator: ImageUrlGenerator;

    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
        this.storeRepository = new StoreRepository(this.dataSource)
        this.imageUrlGenerator = new ImageUrlGenerator();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async findStoreById(@Param(new ValidationPipe({ transform: true })) params: GetStoreByIdDto,
        @Res() res: Response
    ) {
        const service = new GetStoreByIdService(this.storeRepository, this.imageUrlGenerator);
        const result = await service.execute(params);

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener un listado de tiendas con paginación y búsqueda' })
    async findStores(@Query(new ValidationPipe({ transform: true })) getPaginatedStoresDto: GetPaginatedStoresDto,
            @Res() res: Response
        ) {
        const service = new GetPaginatedStoresService(this.storeRepository, this.imageUrlGenerator);
        const result = await service.execute(getPaginatedStoresDto);

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createStore(@Body() createStoreDto: CreateStoreDto, @Res() res: Response) {
        const service = new CreateStoreService(this.storeRepository, this.imageUrlGenerator);
        const result = await service.execute(createStoreDto);

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 201).json(result.Value);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async updateStore(@Param(new ValidationPipe({ transform: true })) params: GetStoreByIdDto, @Body() updateStoreDto: UpdateStoreDto, @Res() res: Response) {
        const service = new UpdateStoreService(this.storeRepository, this.imageUrlGenerator);
        const result = await service.execute({ ...updateStoreDto, id: params.id });

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async deleteStore(@Param(new ValidationPipe({ transform: true })) params: GetStoreByIdDto, @Res() res: Response) {
        const service = new DeleteStoreService(this.storeRepository);
        const result = await service.execute(params);

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }


}
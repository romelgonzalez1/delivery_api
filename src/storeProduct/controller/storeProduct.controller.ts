import { Controller, Inject, Put, ParseUUIDPipe, Delete, Res } from "@nestjs/common";
import type { Response } from 'express';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { DataSource } from "typeorm";
import { StoreProductRepository } from "../repository/postgres/storeProduct.repository";
import { StoreRepository } from "src/store/repository/postgres/store.repository";
import { ProductRepository } from "src/product/repository/postgres/product.repository";
import { JwtAuthGuard } from "src/auth/guard/guard.service";
import { Get, Param, Query, ValidationPipe, Body, Post, UseGuards} from "@nestjs/common";
import { CreateStoreProductDto } from "../dto/validators/create-storeProduct.dto";
import { CreateStoreProductService } from "../services/create-storeProducts.service";
import { GetStoreByIdDto } from "src/store/dto/validators/get-storeById.dto";
import { GetPaginatedStoreProductsService } from "../services/get-paginated-storeProducts.service";
import { GetPaginatedStoresDto } from "src/store/dto/validators/get-paginated-stores.dto";
import { GetPaginatedStoresProductsDto } from "../dto/validators/get-paginated-storeProducts.dto";
import { UpdateStoreProductService } from "../services/update-storeProduct.service";
import { UpdateStoreProductDto } from "../dto/validators/update-storeProduc.dto";
import { GetProductByIdDto } from "src/product/dto/validators/get-productById.dto";
import { DeleteStoreProductsService } from "../services/delete-storeProduct.service";
import { ImageUrlGenerator } from "src/core/image.url.generator/image.url.generator";

@ApiTags('StoreProducts')
@ApiBearerAuth('JWT-auth')
@Controller('stores/:id/products')
export class StoreProductController {
    private readonly storeProductRepository: StoreProductRepository;
    private readonly storeRepository: StoreRepository;
    private readonly productRepository: ProductRepository;
    private readonly imageHandler: ImageUrlGenerator;

    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
        this.storeProductRepository = new StoreProductRepository(this.dataSource)
        this.storeRepository = new StoreRepository(this.dataSource)
        this.productRepository = new ProductRepository(this.dataSource)
        this.imageHandler = new ImageUrlGenerator();
    }

    @Get()
    @ApiOperation({ summary: 'Obtener un listado de productos por tienda con paginación y búsqueda' })
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async findStores(
        @Param(new ValidationPipe({ transform: true })) params: GetStoreByIdDto,
        @Query(new ValidationPipe({ transform: true })) getPaginatedStoresDto: GetPaginatedStoresProductsDto,
        @Res() res: Response
    ) {

        const service = new GetPaginatedStoreProductsService(this.storeProductRepository, this.storeRepository, this.imageHandler);
        const result = await service.execute({ ...getPaginatedStoresDto, storeId: params.id });

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }

    @Post()
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async createStoreProduct(@Param(new ValidationPipe({ transform: true })) storeId: GetStoreByIdDto, @Body() createStoreProductDto: CreateStoreProductDto, @Res() res: Response) {
        const service = new CreateStoreProductService(
            this.storeProductRepository,
            this.productRepository,
            this.storeRepository
        );
        const result = await service.execute({
            ...createStoreProductDto,
            storeId: storeId.id
        });

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 201).json(result.Value);
    }

    @Put('/:storeProductId')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    @ApiParam({ name: 'storeProductId', required: true, description: 'Product id', type: String })
    async updateStoreProduct(
        @Param('id', ParseUUIDPipe) storeId: string, 
        @Param('storeProductId', ParseUUIDPipe) productId: string,
        @Body() updateStoreProductDto: UpdateStoreProductDto,
        @Res() res: Response
    ) {
        const service = new UpdateStoreProductService(
            this.storeProductRepository,
            this.productRepository,
            this.storeRepository
        );
        const result = await service.execute({
            ...updateStoreProductDto,
            storeId: storeId,
            productId: productId
        });

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message });
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }

    @Delete('/:storeProductId')
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    @ApiParam({ name: 'storeProductId', required: true, description: 'Product id', type: String })
    async deleteStoreProduct(
        @Param('id', ParseUUIDPipe) storeId: string, 
        @Param('storeProductId', ParseUUIDPipe) productId: string,
        @Res() res: Response
    ) {
        const service = new DeleteStoreProductsService(this.storeProductRepository);
        const result = await service.execute({
            storeId: storeId,
            productId: productId
        });

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, message: result.Message }) ;
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }

}
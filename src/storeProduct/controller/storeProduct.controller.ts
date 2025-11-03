import { Controller, Inject } from "@nestjs/common";
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

@ApiTags('StoreProducts')
@ApiBearerAuth('JWT-auth')
@Controller('stores/:id/products')
export class StoreProductController {
    private readonly storeProductRepository: StoreProductRepository;
    private readonly storeRepository: StoreRepository;
    private readonly productRepository: ProductRepository;

    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
        this.storeProductRepository = new StoreProductRepository(this.dataSource)
        this.storeRepository = new StoreRepository(this.dataSource)
        this.productRepository = new ProductRepository(this.dataSource)
    }

    @Post()
    @ApiParam({ name: 'id', required: true, description: 'Store id', type: String })
    async createStoreProduct(@Param(new ValidationPipe({ transform: true })) storeId: GetStoreByIdDto, @Body() createStoreProductDto: CreateStoreProductDto) {
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
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }

        return result;
    }
}
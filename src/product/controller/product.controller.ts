import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/validators/create-product.dto';
import { GetProductByIdDto } from '../dto/validators/get-productById.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/guard.service';
import { UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GetProductByIdService } from '../services/get-productById';
import { CreateProductService } from '../services/create-product';
import { ProductRepository } from '../repository/postgres/product.repository';

@ApiTags('Products')
@ApiBearerAuth('JWT-auth')
@Controller('products')
export class ProductController {
    private readonly productRepository: ProductRepository;

    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
        this.productRepository = new ProductRepository(this.dataSource)
    }

    @Get('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Product id', type: String })
    async findProductById(@Param(new ValidationPipe({ transform: true })) params: GetProductByIdDto) {
        const service = new GetProductByIdService(this.productRepository);
        const result = await service.execute(params);

        if (!result.isSuccess()) {
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }

        return result.Value;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        const service = new CreateProductService(this.productRepository);
        const result = await service.execute(createProductDto);

        if (!result.isSuccess()) {
            return { error: result.Error.message, statusCode: result.StatusCode, message: result.Message };
        }
        
        return result.Value;
    }
}
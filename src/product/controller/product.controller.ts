import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/validators/create-product.dto';
import { GetProductByIdDto } from '../dto/validators/get-productById.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/guard.service';
import { UseGuards } from '@nestjs/common';
import { GetProductByIdService } from '../services/get-productById';

@ApiTags('Products')
@ApiBearerAuth('JWT-auth')
@Controller('products')
export class ProductController {

    constructor() {}

    // @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiParam({ name: 'id', required: true, description: 'Product id', type: String })
    async findProductById(@Param(new ValidationPipe({ transform: true })) params: GetProductByIdDto) {
        const service = new GetProductByIdService();
        const result = await service.execute(params);
        return result.Value;
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return 'This action adds a new product';
    }
}
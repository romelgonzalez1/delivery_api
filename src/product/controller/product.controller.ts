import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/guard.service';
import { UseGuards } from '@nestjs/common';

@ApiTags('Products')
@ApiBearerAuth('JWT-auth')
@Controller('products')
export class ProductController {

    constructor() {}

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findProductById(@Param('id') id: string) {
        return `This action returns a product with id: ${id}`;
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return 'This action adds a new product';
    }
}
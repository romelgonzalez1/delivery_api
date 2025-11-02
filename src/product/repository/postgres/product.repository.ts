import { Result } from "src/core/result-handler/result";
import { ProductEntity as ProductORM } from "../../model/entity/product.entity";
import { Product } from "src/product/model/product";
import { IProductRepository } from "../IProductRepository";
import { DataSource, Repository } from "typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { ProductMapper } from "src/product/mapper/product.mapper";

export class ProductRepository extends Repository<ProductORM> implements IProductRepository {

    private readonly productMapper: ProductMapper;

    constructor(datasource: DataSource) {
        super(ProductORM, datasource.createEntityManager());
        this.productMapper = new ProductMapper();
    }

    async findProductById(id: string): Promise<Result<Product>> {
        
        try {
            const product = await this.createQueryBuilder('product')
                .select(['product.id', 'product.name', 'product.description', 'product.image'])
                .where('product.id = :id', { id })
                .getOne();

            if (!product) {
                return Result.fail(new Error('Product not found'), 404, 'Product not found');
            }

            const getProduct = await this.productMapper.fromPersistenceToDomain(product);
            return Result.success(getProduct, 200);
        } catch (error) {
            console.log(error.message);
            return Result.fail(error, 500, error?.message ?? 'Internal error');
        }

    }
        
}
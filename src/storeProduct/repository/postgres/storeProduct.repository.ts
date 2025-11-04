import {  Repository, DataSource } from 'typeorm';
import { StoreProductEntity as StoreProductORM } from '../../model/entity/storeProduct.entity';
import { StoreProduct } from '../../model/storeProduct';
import { IStoreProductRepository } from '../IStoreProductRepository';
import { Result } from 'src/core/result-handler/result';
import { StoreProductMapper } from 'src/storeProduct/mapper/storeProduct.mapper';
import { plainToInstance } from 'class-transformer';
import { ProductDetail } from 'src/product/model/productDetail';

export class StoreProductRepository extends Repository<StoreProductORM> implements IStoreProductRepository {

    private readonly storeProductMapper: StoreProductMapper;

    constructor(datasource: DataSource) {
        super(StoreProductORM, datasource.createEntityManager());
        this.storeProductMapper = new StoreProductMapper();
    }

    async findStoreProductByIds(storeId: string, productId: string): Promise<Result<StoreProduct>> {
        try {
            const storeProduct = await this.createQueryBuilder('store_product')
                .where('store_product.storeId = :storeId', { storeId })
                .andWhere('store_product.productId = :productId', { productId })
                .getOne();
            if (!storeProduct) {
                return Result.fail(new Error('StoreProduct not found'), 404, 'StoreProduct not found');
            }   

            const storeProductDomain = await this.storeProductMapper.fromPersistenceToDomain(storeProduct);

            return Result.success(storeProductDomain, 200);
        } catch (error) {
            console.log(error.message);
            return Result.fail(error, 500, error?.message ?? 'Internal error');
        }
    }

    async findPaginatedStoreProducts(storeId: string, page: number, limit: number, name?: string, inStock?: boolean): Promise<Result<ProductDetail[]>> {
        try {
            const query = await this.createQueryBuilder('store_product')
                .innerJoin('store_product.product', 'product')
                .select(['store_product.storeId', 'store_product.productId', 'product.name', 'product.description', 'product.image', 'store_product.price', 'store_product.stock'])
                .where('store_product.storeId = :storeId', { storeId: storeId })

            if (name) {
                query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
            }

            if (inStock !== undefined) {
                if(inStock){
                    query.andWhere('store_product.stock > 0');
                } else {
                    query.andWhere('store_product.stock = 0');
                }
                
            }

            query.skip((page - 1) * limit).take(limit);

            const response = await query.getRawMany();

            if (response.length === 0) {
                return Result.fail(new Error('No products found'), 404, 'No products found');
            }

            const productDetails = plainToInstance(ProductDetail, response);

            return Result.success(productDetails, 200);

        } catch (error) {
            console.log(error.message);
            return Result.fail(error, 500, error?.message ?? 'Internal error');
        }
    }

    async saveStoreProduct(storeProduct: StoreProduct): Promise<Result<StoreProduct>> {
        try {
            const storeProductORM = await this.storeProductMapper.fromDomainToPersistence(storeProduct);
            const savedStoreProduct = await this.save(storeProductORM);
            const storeProductDomain = await this.storeProductMapper.fromPersistenceToDomain(savedStoreProduct);
            return Result.success(storeProductDomain, 200);
        } catch (error) {
            console.log(error.message);
            return Result.fail(error, 500, error?.message ?? 'Internal error');
        }
    }

    async deleteStoreProduct(storeProduct: StoreProduct): Promise<Result<StoreProduct>> {
        try {

            const deleteResult = await this.delete({ storeId: storeProduct.StoreId, productId: storeProduct.ProductId });

            if (!deleteResult || !deleteResult.affected || deleteResult.affected === 0) {
                return Result.fail<StoreProduct>(new Error('StoreProduct not found'), 404, 'StoreProduct not found');
            }

            return Result.success<StoreProduct>(storeProduct, 200);
        } catch (error) {
            console.log(error.message);
            return Result.fail<StoreProduct>(error, 500, error?.message ?? 'Internal error');
        }
    }
}
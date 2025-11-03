import {  Repository, DataSource } from 'typeorm';
import { StoreProductEntity as StoreProductORM } from '../../model/entity/storeProduct.entity';
import { StoreProduct } from '../../model/storeProduct';
import { IStoreProductRepository } from '../IStoreProductRepository';
import { Result } from 'src/core/result-handler/result';
import { StoreProductMapper } from 'src/storeProduct/mapper/storeProduct.mapper';

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
}
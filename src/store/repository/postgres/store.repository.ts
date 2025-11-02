import { Result } from "src/core/result-handler/result";
import { StoreEntity as StoreORM } from "../../model/entity/store.entity";
import { Store } from "../../model/store";
import { DataSource, Repository } from "typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { StoreMapper } from "../../mapper/store.mapper";
import { IStoreRepository } from "../IStoreRepository";
import { Product } from "src/product/model/product";

export class StoreRepository extends Repository<StoreORM> implements IStoreRepository {

    private readonly storeMapper: StoreMapper;

    constructor(datasource: DataSource) {
        super(StoreORM, datasource.createEntityManager());
        this.storeMapper = new StoreMapper();
    }

    async findStoreById(id: string): Promise<Result<Store>> {

        try {
            const store = await this.createQueryBuilder('store')
                .select(['store.id', 'store.name', 'store.description', 'store.image'])
                .where('store.id = :id', { id })
                .getOne();

            if (!store) {
                return Result.fail(new Error('Store not found'), 404, 'Store not found');
            }

            const getStore = await this.storeMapper.fromPersistenceToDomain(store);
            return Result.success(getStore, 200);

        } catch (error) {
            console.log(error.message);
            return Result.fail(error, 500, error?.message ?? 'Internal error');
        }

    }

    async findPaginatedStores(page: number, limit: number, name?: string): Promise<Result<Store[]>> {
        try {
            const query = await this.createQueryBuilder('store')
                .select(['store.id', 'store.name', 'store.description', 'store.image']);

            if (name) {
                query.where('unaccent(store.name) ILIKE unaccent(:name)', { name: `%${name}%` });
            }

            query.skip((page - 1) * limit).take(limit);

            const response = await query.getMany();

            if (response.length === 0) {
                return Result.fail(new Error('No stores found'), 404, 'No stores found');
            }

            const storesDomain = await Promise.all(response.map(store => this.storeMapper.fromPersistenceToDomain(store)));

            return Result.success(storesDomain, 200);

        } catch (error) {
            console.log(error.message);
            return Result.fail(error, 500, error?.message ?? 'Internal error');
        }
    }

    async createStore(store: Store): Promise<Result<Store>> {
        try {
            const storeORM = await this.storeMapper.fromDomainToPersistence(store);
            const createdStore = await this.save(storeORM);
            const createdStoreDomain = await this.storeMapper.fromPersistenceToDomain(createdStore);
            return Result.success(createdStoreDomain, 201);
        } catch (error) {
            console.log(error.message);
            return Result.fail(error, 500, error?.message ?? 'Internal error');
        }

    }
}
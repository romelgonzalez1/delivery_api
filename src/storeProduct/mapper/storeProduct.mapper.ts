import { StoreProduct } from "../model/storeProduct";
import { StoreProductEntity } from "../model/entity/storeProduct.entity";
import { IMapper } from "src/core/mapper/mapper.interface";

export class StoreProductMapper implements IMapper<StoreProduct, StoreProductEntity> {
    async fromDomainToPersistence(domain: StoreProduct): Promise<StoreProductEntity> {

        const storeProductORM = new StoreProductEntity();

        storeProductORM.storeId = domain.StoreId;
        storeProductORM.productId = domain.ProductId;
        storeProductORM.price = domain.Price;
        storeProductORM.stock = domain.Stock;

        return storeProductORM;
    }

    async fromPersistenceToDomain(persistence: StoreProductEntity): Promise<StoreProduct> {

        const storeProduct = new StoreProduct(
            persistence.productId,
            persistence.storeId,
            persistence.price,
            persistence.stock,
        );

        return storeProduct;
    }
}

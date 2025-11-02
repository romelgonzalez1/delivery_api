import { Product } from "../model/product";
import { ProductEntity } from "../model/entity/product.entity";
import { IMapper } from "src/core/mapper/mapper.interface";

export class ProductMapper implements IMapper<Product, ProductEntity> {
    async fromDomainToPersistence(domain: Product): Promise<ProductEntity> {
        
        const productORM = new ProductEntity();

        productORM.id = domain.Id;
        productORM.name = domain.Name;
        productORM.description = domain.Description;
        productORM.image = domain.Image;

        return productORM;
    }

    async fromPersistenceToDomain(persistence: ProductEntity): Promise<Product> {

        const product = new Product(
            persistence.id,
            persistence.name,
            persistence.description,
            persistence.image,
        );

        return product;
    }
}

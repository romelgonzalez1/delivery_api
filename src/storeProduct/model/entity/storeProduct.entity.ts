import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { StoreEntity } from "src/store/model/entity/store.entity";
import { ProductEntity } from "src/product/model/entity/product.entity";

@Entity('store_product')
export class StoreProductEntity {
    @PrimaryColumn()
    storeId: string;

    @PrimaryColumn()
    productId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @ManyToOne(
        () => StoreEntity,
        (store) => store.productsLink, // 'productsLink' es la propiedad en StoreEntity
        { onDelete: 'CASCADE' } // Si se borra una tienda, se borra la relación
    )
    @JoinColumn({ name: 'storeId' }) // Especifica que storeId es la FK
    store: StoreEntity;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.storesLink, // 'storesLink' es la propiedad en ProductEntity
        { onDelete: 'CASCADE' } // Si se borra un producto, se borra la relación
    )
    @JoinColumn({ name: 'productId' }) // Especifica que productId es la FK
    product: ProductEntity;
}

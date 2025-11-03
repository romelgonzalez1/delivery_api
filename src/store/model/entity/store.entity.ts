import { StoreProductEntity } from "src/storeProduct/model/entity/storeProduct.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('store')
export class StoreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @OneToMany(
        () => StoreProductEntity,
        (storeProduct) => storeProduct.store
    )
    productsLink: StoreProductEntity[];
}

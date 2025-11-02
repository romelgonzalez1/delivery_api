import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;
}

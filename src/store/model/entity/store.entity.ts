import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

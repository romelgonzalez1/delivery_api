import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreProducts1762134775073 implements MigrationInterface {
    name = 'StoreProducts1762134775073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store_product" ("storeId" uuid NOT NULL, "productId" uuid NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_8c18d31dc24e86af79f50318b56" PRIMARY KEY ("storeId", "productId"))`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_8988ebd2c1c321738c3bfa4c9b4" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_13e275149d7414c2694da12dcf7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_13e275149d7414c2694da12dcf7"`);
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_8988ebd2c1c321738c3bfa4c9b4"`);
        await queryRunner.query(`DROP TABLE "store_product"`);
    }

}

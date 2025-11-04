import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedingService } from './seeding.service';
import { StoreEntity } from '../../src/store/model/entity/store.entity';
import { ProductEntity } from '../../src/product/model/entity/product.entity';
import { StoreProductEntity } from '../../src/storeProduct/model/entity/storeProduct.entity';

@Module({
  imports: [],
  providers: [SeedingService],
})
export class SeedingModule {}
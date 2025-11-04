import { ApiProperty } from '@nestjs/swagger';
import { Transform, Expose, Exclude } from 'class-transformer';

@Exclude() 
export class ProductDetail {
  
  @Expose() 
  @Transform(({ obj }) => obj.store_product_storeId)
  storeId: string;

  @Expose()
  @Transform(({ obj }) => obj.store_product_productId)
  productId: string;

  @Expose()
  @Transform(({ obj }) => obj.product_name)
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.product_description)
  description: string;

  @Expose()
  @Transform(({ obj }) => obj.product_image)
  image: string;

  @Expose()
  @Transform(({ obj }) => parseFloat(obj.store_product_price))
  price: number;

  @Expose()
  @Transform(({ obj }) => obj.store_product_stock)
  stock: number;
}
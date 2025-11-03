import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProductController } from './product/controller/product.controller';
import { StoreController } from './store/controller/store.controller'
import { AuthController } from './auth/controller/auth.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import DatabaseProvider from './core/database/postgres/postgresProvider';
import { StoreProductController } from './storeProduct/controller/storeProduct.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [AppController, ProductController, StoreController, AuthController, StoreProductController],
  providers: [AppService, ...DatabaseProvider],
})
export class AppModule {}

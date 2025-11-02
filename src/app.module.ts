import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProductController } from './product/controller/product.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import DatabaseProvider from './core/database/postgresProvider';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [AppController, ProductController],
  providers: [AppService, ...DatabaseProvider],
})
export class AppModule {}

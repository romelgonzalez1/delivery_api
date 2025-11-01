import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductController } from './product/controller/product.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}

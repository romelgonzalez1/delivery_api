import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { JwtAuthGuard } from './guard/guard.service';

@Module({
  providers: [JwtService, JwtAuthGuard],
  exports: [JwtService], // Exportar para usar en otros módulos
})
export class AuthModule {}
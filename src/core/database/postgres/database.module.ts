import { Module, Global } from '@nestjs/common';
import DatabaseProvider from './postgresProvider';

@Global()
@Module({
  providers: [...DatabaseProvider],
  exports: [...DatabaseProvider],
})
export class DatabaseModule {}
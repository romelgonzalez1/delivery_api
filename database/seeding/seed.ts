import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { SeedingService } from './seeding.service';

async function bootstrap() {

  const appContext = await NestFactory.createApplicationContext(AppModule);

  const seeder = appContext.get(SeedingService);

  console.log('Seeding database...');
  try {
    await seeder.seed();
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed!');
    console.error(error);
  } finally {
    await appContext.close();
  }
}

bootstrap();
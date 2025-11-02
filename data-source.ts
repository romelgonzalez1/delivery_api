import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

// Esta configuración DEBE ser idéntica a la de tu postgresProvider
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  
  // ¡MUY IMPORTANTE! La CLI lee los archivos compilados en 'dist'
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  
  migrationsTableName: 'migrations_history',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
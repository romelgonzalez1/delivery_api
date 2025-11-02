import { DataSource, getMetadataArgsStorage } from "typeorm";

export const DatabaseProvider = [{
    provide: DataSource,
    useFactory: async () => {
        const dataSource = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            logging: false,
            entities: getMetadataArgsStorage().tables.map((table) => table.target),
            // ssl: {
            //     rejectUnauthorized: false,
            // },
        });

        try {
            if ( !dataSource.isInitialized ) {
                await dataSource.initialize();
                console.log('Iniciando Conexion a la base de datos Postgres')
            }   
        } catch (error) {
            console.error(error?.message || error);
        }

        return dataSource;
    }
}];

export default DatabaseProvider;

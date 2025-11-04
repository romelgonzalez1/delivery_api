import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { StoreEntity } from 'src/store/model/entity/store.entity';
import { ProductEntity } from 'src/product/model/entity/product.entity';
import { StoreProductEntity } from 'src/storeProduct/model/entity/storeProduct.entity';
import { StoreRepository } from 'src/store/repository/postgres/store.repository';
import { ProductRepository } from 'src/product/repository/postgres/product.repository';
import { StoreProductRepository } from 'src/storeProduct/repository/postgres/storeProduct.repository';

@Injectable()
export class SeedingService {

    private storeRepository: StoreRepository;
    private productRepository: ProductRepository;
    private storeProductRepository: StoreProductRepository;

    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
        this.storeRepository = new StoreRepository(this.dataSource);
        this.productRepository = new ProductRepository(this.dataSource);
        this.storeProductRepository = new StoreProductRepository(this.dataSource);
    }

    async seed() {
        const storesExist = await this.storeRepository.count();
        if (storesExist > 0) {
            console.log('Skipping seed process: Data already exists.');
            return;
        }

        console.log('Starting seed process...');

        console.log('Creating stores...');
        const storesToCreate = [
            this.storeRepository.create({
                name: 'Excelsior Gama',
                description: 'Cadena de supermercados premium con productos de alta calidad.',
                image: 'https://media.licdn.com/dms/image/v2/D4E0BAQF5fZ-1wfHvsA/company-logo_200_200/B4EZo8QzDoJgAM-/0/1761947628072/somosgamave_logo?e=2147483647&v=beta&t=vWgsM7xXjffgSZIb6LUKBWkaztopj6o4M60Uby9ev9Y',
            }),
            this.storeRepository.create({
                name: 'Central Madeirense',
                description: 'Tradición y variedad para la familia venezolana desde 1949.',
                image: 'https://play-lh.googleusercontent.com/lIfHeAdoBX5l3yW6jtVdF8C5Oosn8Ex_QzDALcwiwieYA9HCEvop6zrjkHQ_a6NDz3Y',
            }),
            this.storeRepository.create({
                name: 'Farmatodo',
                description: 'Red de farmacias y tiendas de conveniencia con servicio 24 horas.',
                image: 'https://todainfo.com/wp-content/uploads/cache/images/farmatodo-logo-300x300-1/farmatodo-logo-300x300-1-1800715024.jpg',
            }),
        ];
        const [gama, madeirense, farmatodo] = await this.storeRepository.save(storesToCreate);
        console.log('Stores created successfully.');

        console.log('Creating products...');
        const productsToCreate = [
            this.productRepository.create({
                name: 'Harina P.A.N.',
                description: 'Harina de maíz blanco precocida, ideal para arepas, empanadas y hallacas. Producida por Empresas Polar.',
                image: 'https://cdn4.volusion.store/rdkvp-twsuc/v/vspfiles/photos/HarinaPAN-1kg-2.jpg',
            }),
            this.productRepository.create({
                name: 'Arroz Mary',
                description: 'Arroz de grano entero tipo I, el preferido en la mesa venezolana. Producido por Alimentos Mary.',
                image: 'https://www.alimentosmary.com/wp-content/uploads/2017/08/DUMMIE_ARROZ_TRADICIONAL.jpg',
            }),
            this.productRepository.create({
                name: 'Pasta Ronco (Plumita)',
                description: 'Pasta alimenticia de sémola de trigo durum en corte de plumita. Calidad Ronco.',
                image: 'https://www.sigo.com.ve/images/thumbs/0008048_pasta-pluma-premium-ronco-1-k_450.jpeg',
            }),
            this.productRepository.create({
                name: 'Cocosette',
                description: 'Galleta tipo wafer rellena con crema de coco. Un clásico de Savoy (Nestlé).',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7sfYw3HJXcEe08dU73SD8KFKVw-_50oCPlA&s',
            }),
            this.productRepository.create({
                name: 'Atamel Forte',
                description: 'Analgésico y antipirético (Acetaminofén 650mg). Producido por Laboratorios Calox.',
                image: 'https://calox.com/wp-content/uploads/2023/08/Atamel-Forte.jpg',
            }),
            this.productRepository.create({
                name: 'Dorito',
                description: 'Fritura de maiz con sabor a queso',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfEtj51pt5metcfJXuOZrzxjPIdkH65uMsA&s',
            }),
            this.productRepository.create({
                name: 'Perrarina Dog Chow Cachorros',
                description: 'Alimento seco para perros cachorros. Producido por Purina.',
                image: 'https://purina.com.ve/sites/default/files/2024-08/1200x1200_DC_Gran_Comienzo_cachorros_M%26G.png',
            }),
            this.productRepository.create({
                name: 'Tachipirin',
                description: 'Medicina para la gripe, fiebre, etc',
                image: 'https://www.farmadon.com.ve/wp-content/uploads/2021/02/Tachipirin-Forte-Acetaminofen-Jarabe-Pediatrico-160mg5ml-120-ml-Elmor.jpg',
            }),
            this.productRepository.create({
                name: 'Jabon las LLaves',
                description: 'Jabon azul para limpieza profunda.',
                image: 'https://madisoncenter.com/cdn/shop/products/lasllaves_pastilla_250g.jpg?v=1612396669',
            }),
            this.productRepository.create({
                name: ' Papel Higienico Rosal',
                description: 'Papel higiénico de alta calidad.',
                image: 'https://costazul.sigo.com.ve/images/thumbs/0021188_papel-higienico-rosal-plus-400-hojas-4-unid_450.jpeg',
            }),
        ];
        const [harinaPan, arrozMary, pastaRonco, cocosette, atamel, dorito, perrarina, tachipirin, jabonLasLLaves, papelHigienicoRosal] = await this.productRepository.save(productsToCreate);
        console.log('Products created successfully.');


        console.log('Creating relationships between stores and products...');
        const relationsToCreate = [
            { storeId: gama.id, productId: harinaPan.id, stock: 150, price: 1.49 }, 
            { storeId: gama.id, productId: arrozMary.id, stock: 200, price: 1.29 },
            { storeId: gama.id, productId: pastaRonco.id, stock: 120, price: 1.45 },
            { storeId: gama.id, productId: cocosette.id, stock: 300, price: 0.80 },
            { storeId: gama.id, productId: perrarina.id, stock: 100, price: 9.80 },
            { storeId: gama.id, productId: tachipirin.id, stock: 75, price: 4.50 },
            { storeId: gama.id, productId: jabonLasLLaves.id, stock: 200, price: 1.20 },
            { storeId: gama.id, productId: papelHigienicoRosal.id, stock: 180, price: 2.30 },

            { storeId: madeirense.id, productId: harinaPan.id, stock: 500, price: 1.45 }, 
            { storeId: madeirense.id, productId: arrozMary.id, stock: 600, price: 1.25 },
            { storeId: madeirense.id, productId: pastaRonco.id, stock: 450, price: 1.35 },
            { storeId: madeirense.id, productId: cocosette.id, stock: 400, price: 0.75 },
            { storeId: madeirense.id, productId: perrarina.id, stock: 100, price: 8.90 },
            { storeId: madeirense.id, productId: tachipirin.id, stock: 150, price: 4.20 },
            { storeId: madeirense.id, productId: jabonLasLLaves.id, stock: 300, price: 1.10 },
            { storeId: madeirense.id, productId: papelHigienicoRosal.id, stock: 250, price: 2.10 },

            { storeId: farmatodo.id, productId: atamel.id, stock: 80, price: 2.50 }, 
            { storeId: farmatodo.id, productId: cocosette.id, stock: 150, price: 0.85 },
            { storeId: farmatodo.id, productId: harinaPan.id, stock: 30, price: 1.60 }, 
            { storeId: farmatodo.id, productId: dorito.id, stock: 30, price: 3.60 }, 
            { storeId: farmatodo.id, productId: perrarina.id, stock: 50, price: 10.20 },
            { storeId: farmatodo.id, productId: tachipirin.id, stock: 90, price: 4.80 },
            { storeId: farmatodo.id, productId: jabonLasLLaves.id, stock: 120, price: 1.30 },
        ];

        const relations = this.storeProductRepository.create(relationsToCreate);
        await this.storeProductRepository.save(relations);
        console.log('Relationships created successfully.');

        console.log('Seed process finished successfully.');
    }
}
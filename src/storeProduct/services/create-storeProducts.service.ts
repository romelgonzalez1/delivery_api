import { IApplicationService } from "src/core/service/application-service.interface";
import { CreateStoreProductServiceEntryDTO } from "../dto/entry/create-storeProduct-entry.dto";
import { CreateStoreProductServiceResponseDTO } from "../dto/response/storeProduct-response.dto";
import { Result } from "src/core/result-handler/result";
import { StoreProduct } from "../model/storeProduct";
import { IStoreProductRepository } from "../repository/IStoreProductRepository";
import { IProductRepository } from "src/product/repository/IProductRepository";
import { IStoreRepository } from "src/store/repository/IStoreRepository";

export class CreateStoreProductService implements IApplicationService<CreateStoreProductServiceEntryDTO, CreateStoreProductServiceResponseDTO> {

    constructor(
        private readonly storeProductRepository: IStoreProductRepository,
        private readonly productRepository: IProductRepository,
        private readonly storeRepository: IStoreRepository
    ){}

    async execute(data: CreateStoreProductServiceEntryDTO): Promise<Result<CreateStoreProductServiceResponseDTO>> {

        const productExists = await this.productRepository.findProductById(data.productId);

        if (!productExists.isSuccess()) {
            return Result.fail(new Error('Product does not exist'), 404, 'Product does not exist');
        }

        const storeExists = await this.storeRepository.findStoreById(data.storeId);

        if (!storeExists.isSuccess()) {
            return Result.fail(new Error('Store does not exist'), 404, 'Store does not exist');
        }

        const storeProductExists = await this.storeProductRepository.findStoreProductByIds(data.storeId, data.productId);

        if (storeProductExists.isSuccess()) {
            return Result.fail(new Error('StoreProduct already exists'), 409, 'StoreProduct already exists');
        }

        const domainStore = new StoreProduct(
            data.productId, 
            data.storeId, 
            data.price, 
            data.stock
        );

        const result = await this.storeProductRepository.saveStoreProduct(domainStore);

        if (!result.isSuccess()) {
            return Result.fail(result.Error, result.StatusCode ?? 500, result.Message);
        }

        const response: CreateStoreProductServiceResponseDTO = {
            storeId: result.Value.StoreId!,
            productId: result.Value.ProductId!,
            price: result.Value.Price!,
            stock: result.Value.Stock!
        };

        return Result.success<CreateStoreProductServiceResponseDTO>(response, 201);
    }
}
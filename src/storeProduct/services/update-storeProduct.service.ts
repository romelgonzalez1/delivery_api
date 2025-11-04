import { IApplicationService } from "src/core/service/application-service.interface";
import { CreateStoreProductServiceEntryDTO } from "../dto/entry/create-storeProduct-entry.dto";
import { CreateStoreProductServiceResponseDTO } from "../dto/response/create-storeProduct-response.dto";
import { Result } from "src/core/result-handler/result";
import { StoreProduct } from "../model/storeProduct";
import { IStoreProductRepository } from "../repository/IStoreProductRepository";
import { IProductRepository } from "src/product/repository/IProductRepository";
import { IStoreRepository } from "src/store/repository/IStoreRepository";
import { UpdateStoreProductEntryDto } from "../dto/entry/update-storeProduct-entry.dto";
import { GetStoreProductResponseDto } from "../dto/response/get-storeProduct-response.dto";

export class UpdateStoreProductService implements IApplicationService<UpdateStoreProductEntryDto, GetStoreProductResponseDto> {

    constructor(
        private readonly storeProductRepository: IStoreProductRepository,
        private readonly productRepository: IProductRepository,
        private readonly storeRepository: IStoreRepository
    ){}

    async execute(data: UpdateStoreProductEntryDto): Promise<Result<GetStoreProductResponseDto>> {

        const storeProductExists = await this.storeProductRepository.findStoreProductByIds(data.storeId, data.productId);

        if (!storeProductExists.isSuccess()) {
            return Result.fail(new Error('StoreProduct does not exist'), 404, 'StoreProduct does not exist');
        }

        if(data.price) storeProductExists.Value.Price = data.price
        if(data.stock) storeProductExists.Value.Stock = data.stock

        const result = await this.storeProductRepository.saveStoreProduct(storeProductExists.Value);

        if (!result.isSuccess()) {
            return Result.fail(result.Error, result.StatusCode ?? 500, result.Message);
        }

        const response: GetStoreProductResponseDto = {
            storeId: result.Value.StoreId!,
            productId: result.Value.ProductId!,
            price: result.Value.Price!,
            stock: result.Value.Stock!
        };

        return Result.success<GetStoreProductResponseDto>(response, 201);
    }
}
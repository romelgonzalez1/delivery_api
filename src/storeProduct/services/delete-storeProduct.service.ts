import { Result } from 'src/core/result-handler/result';
import { IApplicationService } from '../../core/service/application-service.interface';
import { Res } from '@nestjs/common';
import { error } from 'console';
import { GetPaginatedStoresProductsEntryDto } from '../dto/entry/get-paginated-storeProducts-entry.dto';
import { GetPaginatedStoresProductsResponseDto } from '../dto/response/get-paginated-storeProducts-response.dto';
import { IStoreProductRepository } from '../repository/IStoreProductRepository';
import { IStoreRepository } from 'src/store/repository/IStoreRepository';
import { StoreProduct } from '../model/storeProduct';
import { ProductDetail } from '../../product/model/productDetail';
import { DeleteStoreProductEntryDto } from '../dto/entry/delete-storeProduct-entry.dto';
import { GetStoreProductResponseDto } from '../dto/response/get-storeProduct-response.dto';


export class DeleteStoreProductsService implements IApplicationService<DeleteStoreProductEntryDto, GetStoreProductResponseDto> {

    constructor(
        private readonly storeProductRepository: IStoreProductRepository
    ){}

    async execute(data: DeleteStoreProductEntryDto): Promise<Result<GetStoreProductResponseDto>> {

        const storeProductExists = await this.storeProductRepository.findStoreProductByIds(data.storeId, data.productId);

        if(!storeProductExists.isSuccess()){
            return Result.fail(storeProductExists.Error, storeProductExists?.StatusCode ?? 500, storeProductExists.Message)
        }

        const result = await this.storeProductRepository.deleteStoreProduct(storeProductExists.Value);

        if(!result.isSuccess()){
            return Result.fail(result.Error, result?.StatusCode ?? 500, result.Message)
        }

        const response: GetStoreProductResponseDto = {
            storeId: result.Value.StoreId,
            productId: result.Value.ProductId,
            price: result.Value.Price,
            stock: result.Value.Stock
        };

        return Result.success<GetStoreProductResponseDto>(response, 200);
    }

}

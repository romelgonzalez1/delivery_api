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
import { IImageHandler } from 'src/core/image.url.generator/IImageHandler';

export class GetPaginatedStoreProductsService implements IApplicationService<GetPaginatedStoresProductsEntryDto, GetPaginatedStoresProductsResponseDto> {

    constructor(
        private readonly storeProductRepository: IStoreProductRepository,
        private readonly storeRepository: IStoreRepository,
        private readonly imageHandler: IImageHandler
    ){}

    async execute(data: GetPaginatedStoresProductsEntryDto): Promise<Result<GetPaginatedStoresProductsResponseDto>> {

        const storeExists = await this.storeRepository.findStoreById(data.storeId);

        if(!storeExists.isSuccess()){
            return Result.fail(storeExists.Error, storeExists?.StatusCode ?? 500, storeExists.Message)
        }

        const productDetails: Result<ProductDetail[]> = await this.storeProductRepository.findPaginatedStoreProducts(data.storeId, data.page, data.limit, data?.q, data?.inStock)

        if(!productDetails.isSuccess()){
            return Result.fail(productDetails.Error, productDetails?.StatusCode ?? 500, productDetails.Message)
        }

        const response: GetPaginatedStoresProductsResponseDto = {
            productDetails: productDetails.Value.map(productDetail => ({
                storeId: productDetail.storeId,
                productId: productDetail.productId,
                name: productDetail.name,
                description: productDetail.description,
                image: productDetail.image,
                price: productDetail.price,
                stock: productDetail.stock
            })),
            total: productDetails.Value.length,
            page: data.page,
            limit: data.limit,
        };

        for (let i = 0; i < response.productDetails.length; i++) {
            response.productDetails[i].image = await this.imageHandler.generateImage(response.productDetails[i].image);
        }

        return Result.success<GetPaginatedStoresProductsResponseDto>(response, 200);
    }

}

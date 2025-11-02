import { Result } from 'src/core/result-handler/result';
import { IApplicationService } from '../../core/service/application-service.interface';
import { GetProductByIdServiceResponseDto } from '../dto/response/get-product-response.dto';
import { GetProductByIdServiceEntryDto } from '../dto/entry/get-productById-entry.dto';
import { IProductRepository } from '../repository/IProductRepository';
import { Product } from '../model/product';
import { Res } from '@nestjs/common';
import { error } from 'console';

export class GetProductByIdService implements IApplicationService<GetProductByIdServiceEntryDto, GetProductByIdServiceResponseDto> {

    constructor(
        private readonly productRepository: IProductRepository
    ){}

    async execute(data: GetProductByIdServiceEntryDto): Promise<Result<GetProductByIdServiceResponseDto>> {

        const product: Result<Product> = await this.productRepository.findProductById(data.id)

        if(!product.isSuccess()){
            return Result.fail(product.Error, product?.StatusCode ?? 500, product.Message)
        }

        const response: GetProductByIdServiceResponseDto = {
            id: product.Value.Id,
            name: product.Value.Name,
            description: product.Value.Description,
            image: product.Value.Image,
        };

        return Result.success<GetProductByIdServiceResponseDto>(response, 200);
    }

}
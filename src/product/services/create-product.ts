import { IApplicationService } from "src/core/service/application-service.interface";
import { CreateProductEntryDto } from "../dto/entry/create-product-entry.dto";
import { CreateProductResponseDto } from "../dto/response/create-product-response.dto";
import { Result } from "src/core/result-handler/result";
import { IProductRepository } from "../repository/IProductRepository";
import { Product } from "../model/product";
import { randomUUID } from 'crypto';


export class CreateProductService implements IApplicationService<CreateProductEntryDto, CreateProductResponseDto> {

    constructor(
        private readonly productRepository: IProductRepository
    ){}

    async execute(data: CreateProductEntryDto): Promise<Result<CreateProductResponseDto>> {

        const domainProduct = new Product(
            randomUUID(), 
            data.name, 
            data.description, 
            data.image
        );

        const result = await this.productRepository.createProduct(domainProduct);

        if (!result.isSuccess()) {
            return Result.fail(result.Error, result.StatusCode ?? 500, result.Message);
        }

        const response: CreateProductResponseDto = {
            id: result.Value.Id!,
        };

        return Result.success<CreateProductResponseDto>(response, 201);
    }
}
import { IApplicationService } from "src/core/service/application-service.interface";
import { CreateProductEntryDto } from "../dto/entry/create-product-entry.dto";
import { CreateProductResponseDto } from "../dto/response/create-product-response.dto";
import { Result } from "src/core/result-handler/result";
import { IProductRepository } from "../repository/IProductRepository";
import { Product } from "../model/product";
import { randomUUID } from 'crypto';
import { IImageHandler } from "src/core/image.url.generator/IImageHandler";

export class CreateProductService implements IApplicationService<CreateProductEntryDto, CreateProductResponseDto> {

    constructor(
        private readonly productRepository: IProductRepository,
        private readonly imageHandler: IImageHandler
    ) {}

    async execute(data: CreateProductEntryDto): Promise<Result<CreateProductResponseDto>> {

        const imageId = await this.imageHandler.UploadImage(data.image);

        const domainProduct = new Product(
            randomUUID(), 
            data.name, 
            data.description, 
            imageId
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
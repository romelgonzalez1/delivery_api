import { IApplicationService } from "src/core/service/application-service.interface";
import { CreateStoreEntryDto } from "../dto/entry/create-store-entry.dto";
import { CreateStoreResponseDto } from "../dto/response/create-store-response.dto";
import { Result } from "src/core/result-handler/result";
import { randomUUID } from 'crypto';
import { Store } from "../model/store";
import { CreateProductResponseDto } from "src/product/dto/response/create-product-response.dto";
import { IStoreRepository } from "../repository/IStoreRepository";


export class CreateStoreService implements IApplicationService<CreateStoreEntryDto, CreateStoreResponseDto> {

    constructor(
        private readonly storeRepository: IStoreRepository
    ){}

    async execute(data: CreateStoreEntryDto): Promise<Result<CreateStoreResponseDto>> {

        const domainStore = new Store(
            randomUUID(), 
            data.name, 
            data.description, 
            data.image
        );

        const result = await this.storeRepository.createStore(domainStore);

        if (!result.isSuccess()) {
            return Result.fail(result.Error, result.StatusCode ?? 500, result.Message);
        }

        const response: CreateProductResponseDto = {
            id: result.Value.Id!,
        };

        return Result.success<CreateProductResponseDto>(response, 201);
    }
}
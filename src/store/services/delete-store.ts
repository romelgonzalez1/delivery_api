import { IApplicationService } from "src/core/service/application-service.interface";
import { Result } from "src/core/result-handler/result";
import { randomUUID } from 'crypto';
import { Store } from "../model/store";
import { IStoreRepository } from "../repository/IStoreRepository";
import { DeleteStoreServiceEntryDto } from "../dto/entry/delete-store-entry.dto";
import { DeleteStoreServiceResponseDto } from "../dto/response/delete-store-response.dto";


export class DeleteStoreService implements IApplicationService<DeleteStoreServiceEntryDto, DeleteStoreServiceResponseDto> {

    constructor(
        private readonly storeRepository: IStoreRepository
    ){}

    async execute(data: DeleteStoreServiceEntryDto): Promise<Result<DeleteStoreServiceResponseDto>> {

        const result = await this.storeRepository.findStoreById(data.id);

        if (!result.isSuccess()) {
            return Result.fail(result.Error, result.StatusCode ?? 500, result.Message);
        }

        const deletedStore = await this.storeRepository.deleteStore(result.Value);

        if(!deletedStore.isSuccess){
            return Result.fail(result.Error, result.StatusCode ?? 500, result.Message);
        }

        const response: DeleteStoreServiceResponseDto = {
            id: deletedStore.Value.Id,
            name: deletedStore.Value.Name,
            description: deletedStore.Value.Description,
            image: deletedStore.Value.Image
        };

        return Result.success<DeleteStoreServiceResponseDto>(response, 201);
    }
}
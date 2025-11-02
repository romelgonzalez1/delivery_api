import { IApplicationService } from "src/core/service/application-service.interface";
import { Result } from "src/core/result-handler/result";
import { randomUUID } from 'crypto';
import { Store } from "../model/store";
import { IStoreRepository } from "../repository/IStoreRepository";
import { UpdateStoreServiceEntryDto } from "../dto/entry/update-store-entry.dto";
import { UpdateStoreServiceResponseDto } from "../dto/response/update-store-response.dto";


export class UpdateStoreService implements IApplicationService<UpdateStoreServiceEntryDto, UpdateStoreServiceResponseDto> {

    constructor(
        private readonly storeRepository: IStoreRepository
    ){}

    async execute(data: UpdateStoreServiceEntryDto): Promise<Result<UpdateStoreServiceResponseDto>> {

        const result = await this.storeRepository.findStoreById(data.id);

        if (!result.isSuccess()) {
            return Result.fail<UpdateStoreServiceResponseDto>(result.Error, result.StatusCode ?? 500, result.Message);
        }

        if(data.name) result.Value.Name = data.name;
        if(data.description) result.Value.Description = data.description;
        if(data.image) result.Value.Image = data.image;

        const update = await this.storeRepository.saveStore(result.Value);

        if (!update.isSuccess()) {
            return Result.fail<UpdateStoreServiceResponseDto>(update.Error, update.StatusCode ?? 500, update.Message);
        }

        const response: UpdateStoreServiceResponseDto = {
            id: update.Value.Id!,
            name: update.Value.Name,
            description: update.Value.Description,
            image: update.Value.Image
        };

        return Result.success<UpdateStoreServiceResponseDto>(response, 200);
    }
}
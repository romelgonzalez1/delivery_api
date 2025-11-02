import { Result } from 'src/core/result-handler/result';
import { IApplicationService } from '../../core/service/application-service.interface';
import { Res } from '@nestjs/common';
import { error } from 'console';
import { GetStoreByIdServiceEntryDto } from '../dto/entry/get-storeById-entry.dto';
import { GetStoreByIdServiceResponseDto } from '../dto/response/get-store-response.dto';
import { IStoreRepository } from '../repository/IStoreRepository';
import { Store } from '../model/store';


export class GetStoreByIdService implements IApplicationService<GetStoreByIdServiceEntryDto, GetStoreByIdServiceResponseDto> {

    constructor(
        private readonly storeRepository: IStoreRepository
    ){}

    async execute(data: GetStoreByIdServiceEntryDto): Promise<Result<GetStoreByIdServiceResponseDto>> {

        const store: Result<Store> = await this.storeRepository.findStoreById(data.id)

        if(!store.isSuccess()){
            return Result.fail(store.Error, store?.StatusCode ?? 500, store.Message)
        }

        const response: GetStoreByIdServiceResponseDto = {
            id: store.Value.Id,
            name: store.Value.Name,
            description: store.Value.Description,
            image: store.Value.Image,
        };

        return Result.success<GetStoreByIdServiceResponseDto>(response, 200);
    }

}
import { Result } from 'src/core/result-handler/result';
import { IApplicationService } from '../../core/service/application-service.interface';
import { Res } from '@nestjs/common';
import { error } from 'console';
import { GetPaginatedStoresEntryDto } from '../dto/entry/get-paginated-stores-entry.dto';
import { GetPaginatedStoresResponseDto } from '../dto/response/get-paginated-stores-response.dto';
import { IStoreRepository } from '../repository/IStoreRepository';
import { Store } from '../model/store';
import { IImageHandler } from 'src/core/image.url.generator/IImageHandler';

export class GetPaginatedStoresService implements IApplicationService<GetPaginatedStoresEntryDto, GetPaginatedStoresResponseDto> {

    constructor(
        private readonly storeRepository: IStoreRepository,
        private readonly imageHandler: IImageHandler
    ) {}

    async execute(data: GetPaginatedStoresEntryDto): Promise<Result<GetPaginatedStoresResponseDto>> {

        const stores: Result<Store[]> = await this.storeRepository.findPaginatedStores(data.page, data.limit, data.q);

        if(!stores.isSuccess()){
            return Result.fail(stores.Error, stores?.StatusCode ?? 500, stores.Message)
        }

        const response: GetPaginatedStoresResponseDto = {
            stores: stores.Value.map(store => ({
                id: store.Id,
                name: store.Name,
                description: store.Description,
                image: store.Image,
            })),
            total: stores.Value.length,
            page: data.page,
            limit: data.limit,
        };

        for (let i = 0; i < response.stores.length; i++) {
            response.stores[i].image = await this.imageHandler.generateImage(response.stores[i].image);
        }

        return Result.success<GetPaginatedStoresResponseDto>(response, 200);
    }

}

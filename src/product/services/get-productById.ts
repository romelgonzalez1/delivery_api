import { Result } from 'src/core/result-handler/result';
import { IApplicationService } from '../../core/service/application-service.interface';
import { GetProductByIdServiceResponseDto } from '../dto/response/get-product-response.dto';
import { GetProductByIdServiceEntryDto } from '../dto/entry/get-productById-entry.dto';

export class GetProductByIdService implements IApplicationService<GetProductByIdServiceEntryDto, GetProductByIdServiceResponseDto> {

    constructor(){}

    async execute(data: GetProductByIdServiceEntryDto): Promise<Result<GetProductByIdServiceResponseDto>> {

        const response: GetProductByIdServiceResponseDto = {
            id: data.id,
            name: "Sample Product",
            description: "This is a sample product description.",
            image: "http://example.com/image.png"
        };

        return Result.success<GetProductByIdServiceResponseDto>(response, 200);
    }

}
import { IApplicationService } from "src/core/service/application-service.interface";
import { CreateProductEntryDto } from "../dto/entry/create-product-entry.dto";
import { CreateProductResponseDto } from "../dto/response/create-product-response.dto";
import { Result } from "src/core/result-handler/result";


export class CreateProductService implements IApplicationService<CreateProductEntryDto, CreateProductResponseDto> {

    constructor(){}

    async execute(data: CreateProductEntryDto): Promise<Result<CreateProductResponseDto>> {

        const response: CreateProductResponseDto = {
            id: "id"
        }

        return Result.success<CreateProductResponseDto>(response, 200);
    }
}
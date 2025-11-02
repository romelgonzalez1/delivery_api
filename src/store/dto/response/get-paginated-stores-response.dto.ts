import { GetStoreByIdServiceResponseDto } from "./get-store-response.dto";

export class GetPaginatedStoresResponseDto {
    stores: GetStoreByIdServiceResponseDto[];
    total: number;
    page: number;
    limit: number;
}
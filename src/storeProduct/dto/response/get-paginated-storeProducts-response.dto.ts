import { GetProductDetailResponseDto } from "src/product/dto/response/get-productDetail-response.dto";

export class GetPaginatedStoresProductsResponseDto {
    productDetails: GetProductDetailResponseDto[];
    total: number;
    page: number;
    limit: number;
}
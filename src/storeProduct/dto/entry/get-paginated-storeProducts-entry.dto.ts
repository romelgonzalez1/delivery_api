export class GetPaginatedStoresProductsEntryDto {
    storeId: string;
    page: number;
    limit: number;
    q?: string;
    inStock?: boolean;
}
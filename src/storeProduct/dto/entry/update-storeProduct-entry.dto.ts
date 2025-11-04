export interface UpdateStoreProductEntryDto {
    storeId: string;
    productId: string;
    price?: number;
    stock?: number;
}
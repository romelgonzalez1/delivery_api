import { Result } from "src/core/result-handler/result";
import { StoreProduct } from "../model/storeProduct";

export interface IStoreProductRepository {
    findStoreProductByIds(storeId: string, productId: string): Promise<Result<StoreProduct>>;
    // findPaginatedStoreProducts(page: number, limit: number, q?: string): Promise<Result<StoreProduct[]>>;
    saveStoreProduct(storeProduct: StoreProduct): Promise<Result<StoreProduct>>;
}
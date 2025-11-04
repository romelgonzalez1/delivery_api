import { Result } from "src/core/result-handler/result";
import { StoreProduct } from "../model/storeProduct";
import { ProductDetail } from "../../product/model/productDetail";

export interface IStoreProductRepository {
    findStoreProductByIds(storeId: string, productId: string): Promise<Result<StoreProduct>>;
    findPaginatedStoreProducts(storeId: string, page: number, limit: number, name?: string, inStock?: boolean): Promise<Result<ProductDetail[]>>;
    saveStoreProduct(storeProduct: StoreProduct): Promise<Result<StoreProduct>>;
    deleteStoreProduct(storeProduct: StoreProduct): Promise<Result<StoreProduct>>;
}
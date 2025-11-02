import { Result } from "src/core/result-handler/result";
import { Store } from "../model/store";

export interface IStoreRepository {
    findStoreById(id: string): Promise<Result<Store>>;
    findPaginatedStores(page: number, limit: number, q?: string): Promise<Result<Store[]>>;
    saveStore(store: Store): Promise<Result<Store>>;
    deleteStore(store: Store): Promise<Result<Store>>;
}
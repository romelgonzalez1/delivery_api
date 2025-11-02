import { Result } from "src/core/result-handler/result";
import { Product } from "../model/product";

export interface IProductRepository {
    findProductById(id: string): Promise<Result<Product>>;
    // Other repository methods can be defined here
}
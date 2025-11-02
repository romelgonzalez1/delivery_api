import { Result } from "src/core/result-handler/result";
import { Product } from "../model/product";

export interface IProductRepository {
    findProductById(id: string): Promise<Result<Product>>;
    createProduct(product: Product): Promise<Result<Product>>;
}
export class StoreProduct {

    private productId: string;
    private storeId: string;
    private price: number;
    private stock: number;

    constructor(productId: string, storeId: string, price: number, stock: number) {
        this.productId = productId;
        this.storeId = storeId;
        this.price = price;
        this.stock = stock;
    }

    get ProductId(): string {
        return this.productId;
    }

    get StoreId(): string {
        return this.storeId;
    }

    get Price(): number {
        return this.price;
    }

    get Stock(): number {
        return this.stock;
    }

    set Price(price: number) {
        this.price = price;

    }

    set Stock(stock: number) {
        this.stock = stock;
    }

}
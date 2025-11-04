export interface GetProductDetailResponseDto {
    storeId: string;
    productId: string;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
}
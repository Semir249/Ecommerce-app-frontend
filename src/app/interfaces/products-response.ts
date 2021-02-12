export interface ProductsResponse {
    products: [
        {
            images: string[],
            _id: string,
            name: string,
            category: string,
            price: number,
            quantity: number,
            ratings: number
        }
    ]
}

export interface GetOrderResponse{
    orders: [
        {
            products: {
                productId: string,
                name: string,
                price: number,
                quantity: number
            },
            _id: string,
            total: number,
            status: string
        }
    ]
}
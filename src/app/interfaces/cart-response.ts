export interface CartResponse {
    cart: [
        {
            _id: string,
            productId: string,
            quantity: number,
            name: string,
            price: number,
            left:number,
            images: [
                string
            ]
        }
    ]
}
export interface ProductDetailsResponse{
    product: {
        images:string[],
        _id: string,
        name: string,
        category: string,
        price: number,
        quantity: number,
        description?:string,
        reviews: [
            {
                _id: string,
                user: string,
                comment?: string,
                stars: number
            }
        ],
        ratings: number
    }
}
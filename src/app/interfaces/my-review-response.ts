export interface MyReviewsResponse{
    reviews: [
        {
            _id: string,
            user: string,
            stars: number,
            prodId: string,
            name: string,
            image: string,
            comment?:string,
            edit:boolean
        }
    ]
}
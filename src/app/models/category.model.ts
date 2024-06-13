export interface category {
    id: number;
    name: string;
    image: string;
    imagePath: string;
}
export interface CategoryCount {
    id: number,
    name: string;
    productCount: number;
}
export interface RangePriceCount {
    id: number,
    minPrice: number;
    maxPrice: number;
    productCount: number;
}
export interface ReviewCount {
    rating: number;
    productCount: number;
}
export interface Cart {
    id: number;
    userId: number;
    products: CartProducts[];
}
export interface CartProducts {
    id: number;
    idProduct: number;
    title: string;
    imagePath: string;
    price: number;
    quantity: number;
    categoryName: string;
}
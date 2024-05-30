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
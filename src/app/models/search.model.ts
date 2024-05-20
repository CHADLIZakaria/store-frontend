export interface searchProduct {
    sizePages: number;
    currentPage: number;
    keyword: string;
    idsCategory: string
}

export interface searchUser {
    sizePages: number;
    currentPage: number;
    keyword: string;
}

export interface searchReview {
    sizePages: number;
    currentPage: number;
    keyword: string;
    idProduct: number | null;
    username: string;
    approved: number
}
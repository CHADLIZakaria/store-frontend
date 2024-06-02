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
    page?: number;
    size?: number;
    keyword?: string;
    idProduct?: number;
    username?: string;
    approved?: boolean;
    sort?: string;
    direction?: string
}
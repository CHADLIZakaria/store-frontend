export interface paginationResponse<T> {
    totalElement: number;
    sizePages: number;
    currentPage: number;
    totalPages: number;
    data: T[];
}
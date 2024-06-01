import { product } from "./product.model";
import { user } from "./user.model";

export interface review {
    id?: number;
    rating: number;
    description: string;
    product: product;
    user: user;
    createdAt?: string;
    isApproved?: boolean;
}
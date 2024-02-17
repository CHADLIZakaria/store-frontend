import { category } from "./category.model";

export interface product {
    id: number;
    title: string;
    price: number;
    description: string;
    imagePath: number;
    image: string;
    category: category;
}
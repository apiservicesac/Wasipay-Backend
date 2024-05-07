import { ProductState, ProductType, ProductVisibility } from "../enums";

export interface ProductEntity {
    id?: string;
    name?: string;  
    description?: string;  
    quantity?: number;
    sku?: string;
    brand?: string;
    product_category?: string;
    product_type?: ProductType;
    shop?: string;
    file?: string[];
    status?: ProductState;
    visibility?: ProductVisibility;
    createdAt?: Date;
    updatedAt?: Date;
}
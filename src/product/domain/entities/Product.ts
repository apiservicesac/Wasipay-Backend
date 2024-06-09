import { ImageEntity } from "@/image_uploader/domain/entities";
import { ProductState, ProductType, ProductVisibility } from "../enums";

export interface ProductEntity {
    _id?: string;
    name?: string;
    code_product?: string; 
    description?: string;
    price?: number;
    discount?: number;
    quantity?: number;
    sku?: string;
    brand?: string;
    product_category?: string;
    product_type?: ProductType;
    shop_id?: string;
    images?: ImageEntity[];
    status?: ProductState;
    visibility?: ProductVisibility;
    createdAt?: Date;
    updatedAt?: Date;
}
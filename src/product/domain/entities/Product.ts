import { ImageEntity } from "@/image_uploader/domain/entities";
import { ProductState, ProductTax, ProductType, ProductVisibility } from "../enums";

export interface ProductEntity {
    _id?: string;
    name?: string;
    product_code?: string; 
    description?: string;
    price?: number;
    discount?: number;
    quantity?: number;
    sku?: string;
    brand?: string;
    product_category?: string;
    product_type?: ProductType;
    product_tax?: ProductTax,
    tags?: string[],
    publish_date_time: Date,
    shop_id?: string;
    images?: ImageEntity[];
    status?: ProductState;
    visibility?: ProductVisibility;
    createdAt?: Date;
    updatedAt?: Date;
}
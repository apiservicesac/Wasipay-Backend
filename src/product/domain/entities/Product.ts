import { ShopEntity } from "@/shop/domain/entities";

export interface ProductEntity {
    id?: string;
    title?: string;
    price?: string;
    price_offer?: string;
    price_card?: string;
    discount?: number;
    brand?: string;
    url?: string;
    category_main?: string;
    category?: string;
    subcategory?: string;     
    shop?: ShopEntity;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
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
    // shop_id?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
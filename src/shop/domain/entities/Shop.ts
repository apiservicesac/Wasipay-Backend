export interface ShopEntity {
    _id?: string;
    name?: string;
    description?: string;   
    address?: string;
    city?: string;
    country?: string;
    email?: string;
    phone?: string;
    image?: string;
    social_media?: {
        facebook?: string;
        tiktok?: string;
        instagram?: string;
        whatsapp?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
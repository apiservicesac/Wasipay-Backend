export interface ShopEntity {
    id?: string;
    name?: string;
    description?: string;
    image_id?: string;    
    address?: string;
    city?: string;
    country?: string;
    postal_code?: string;
    email?: string;
    phone?: string;
    social_media?: {
        facebook?: string;
        tiktok?: string;
        instagram?: string;
        youtube?: string;
        whatsapp?: string;
    };
    opening_hours?: {
        monday?: string;
        tuesday?: string;
        wednesday?: string;
        thursday?: string;
        friday?: string;
        saturday?: string;
        sunday?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
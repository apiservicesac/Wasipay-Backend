import { ImageEntity } from "@/image_uploader/domain/entities";

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
    image?: ImageEntity;
    social_media?: {
        facebook?: string;
        tiktok?: string;
        instagram?: string;
        youtube?: string;
        whatsapp?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
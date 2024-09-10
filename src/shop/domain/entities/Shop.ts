import { ImageEntity } from "@/image_uploader/domain/entities";

export interface ShopEntity {
    id?: string;
    name?: string;
    description?: string;   
    image?: ImageEntity;
    social_media?: {
        facebook?: string;
        tiktok?: string;
        instagram?: string;
        // youtube?: string;
        whatsapp?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
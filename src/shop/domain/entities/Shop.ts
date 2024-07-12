import { ImageEntity } from "@/image_uploader/domain/entities";
import { PaymentMethodEntity } from "@/payment_method/domain/entities";

export interface ShopEntity {
    _id?: string;
    name?: string;
    description?: string;   
    address?: string;
    city?: string;
    country?: string;
    email?: string;
    phone?: string;
    image?: ImageEntity;
    payment_method?: string[] | PaymentMethodEntity[];
    social_media?: {
        facebook?: string;
        tiktok?: string;
        instagram?: string;
        whatsapp?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
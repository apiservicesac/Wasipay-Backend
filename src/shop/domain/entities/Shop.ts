import { ImageEntity } from "@/image_uploader/domain/entities";

export interface ShopEntity {
    id?: string;
    name?: string;
    image?: ImageEntity;
    createdAt?: Date;
    updatedAt?: Date;
}
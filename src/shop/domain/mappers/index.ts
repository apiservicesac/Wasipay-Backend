import { ImageDtoMapper } from "@/image_uploader/domain/mappers";
import { ShopEntity as Entity } from "../entities";

export class ShopDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity._id,
            name: entity.name,
            description: entity.description,
            address: entity.address,
            city: entity.city,
            country: entity.country,
            postal_code: entity.postal_code,
            email: entity.email,
            phone: entity.phone,
            image: entity.image ? ImageDtoMapper.toJson(entity.image) : null,
            social_media: entity.social_media,
        };
    }
}
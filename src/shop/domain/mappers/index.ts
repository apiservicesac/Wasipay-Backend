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
            email: entity.email,
            phone: entity.phone,
            image: entity.image,
            social_media: entity.social_media,
        };
    }
}
import { ImageDtoMapper } from "@/image_uploader/domain/mappers";
import { ShopEntity as Entity } from "../entities";
import { PaymentMethodDtoMapper } from "@/payment_method/domain/mappers";
import { PaymentMethodEntity } from "@/payment_method/domain/entities";

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
            payment_method: entity.payment_method ? entity.payment_method.map((item: PaymentMethodEntity) => PaymentMethodDtoMapper.toJson(item)) : entity.payment_method,
            image: entity.image ? ImageDtoMapper.toJson(entity.image) : null,
            social_media: entity.social_media,
        };
    }
}
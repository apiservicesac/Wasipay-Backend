import { ImageDtoMapper } from "@/image_uploader/domain/mappers";
import { ShopEntity as Entity } from "../entities";

export class ShopDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity.id,
            name: entity.name,
            image: entity.image ? ImageDtoMapper.toJson(entity.image) : null,
        };
    }
}
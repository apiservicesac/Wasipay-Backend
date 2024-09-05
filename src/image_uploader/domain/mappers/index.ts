import { ImageEntity as Entity } from "../entities";

export class ImageDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity.id,
            name: entity.name,
            url: entity.url,            
        };
    }
}
import { ClientEntity as Entity } from "../entities";

export class ClientDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity._id,
            name: entity.name,
            last_name: entity.last_name,
            vat: entity.vat,
            business_name: entity.business_name,
            coordinates: entity.coordinates,
            image: entity.image ? entity.image.url : null
        };
    }
}
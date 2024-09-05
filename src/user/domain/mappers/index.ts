import { UserEntity as Entity } from "../entities";

export class UserDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity.id,
            first_name: entity.first_name,
            last_name: entity.last_name,
            phone_number: entity.phone_number,
            email: entity.email,
            role: entity.role,
            shop: entity.shopid ? entity.shopid : null,            
        };
    }
}
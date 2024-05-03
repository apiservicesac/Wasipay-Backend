import { UserEntity as Entity } from "../entities";

export class UserDtoMapper {
    static toDto(entity: Entity): any {
        return {
            first_name: entity.getFirstName(),
            last_name: entity.getLastName(),
            phone_number: entity.getPhoneNumber(),
            email: entity.getEmail(),
            login_date: entity.getLoginDate(),
            password: entity.getPassword(),
            role: 'USER',
        };
    }

    static toJson(entity: Entity): any {
        const options : any = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return {
            id: entity.getId(),
            first_name: entity.getFirstName(),
            last_name: entity.getLastName(),
            phone_number: entity.getPhoneNumber(),
            email: entity.getEmail(),
            login_date: entity.getLoginDate()?.toLocaleString('es-PE', options).toUpperCase(),
            role: entity.getRole(),
        };
    }

    static fromDto(dto: Entity): Entity {        
        const entity: Entity = new Entity({...dto});       
        return entity;
    }
}
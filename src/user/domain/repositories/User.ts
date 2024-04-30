import { UserEntity as Entity } from "../entities/User"

export interface UserRepository {
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
    getByEmail: (email: string) => Promise<Entity | null>
    save: (entity: Entity) => Promise<Entity | null>
    update: (entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>    
    delete: (id: string) => Promise<void | null>
}

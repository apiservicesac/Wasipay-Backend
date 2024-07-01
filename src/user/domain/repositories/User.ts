import { UserEntity as Entity } from '../entities'

export interface UserRepository {
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
    getByEmail: (email: string) => Promise<Entity | null>

    save: (entity: Entity) => Promise<Entity | null>
    update: (id : string, entity: Entity) => Promise<Entity | null>
    
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>
    delete: (id: string) => Promise<void | null>
}

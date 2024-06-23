import { ClientEntity as Entity } from '../entities'

export interface ClientRepository {
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
    
    save: (entity: Entity) => Promise<Entity | null>
    
    update: (id: string, entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>

    update_image: (id: string, image_id: string) => Promise<Entity | null>

    delete: (id: string) => Promise<void | null>
}
import { ProductEntity as Entity } from '../entities'

export interface ProductRepository {
    getAll: (shop_id: string) => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
    save: (entity: Entity) => Promise<Entity | null>
    update: (id: string, entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>
    delete: (id: string) => Promise<void | null>
}

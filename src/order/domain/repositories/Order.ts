import { OrderEntity as Entity } from '../entities'

export interface OrderRepository {
    getAll: (shop_id: string) => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
    getNextCode: (shop_id: string) => Promise<string | null>

    
    save: (entity: Entity) => Promise<Entity | null>
    update: (id: string, entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>

    delete: (id: string) => Promise<void | null>
}
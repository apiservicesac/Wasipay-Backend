import { ShopEntity as Entity } from '../entities'

export interface ShopRepository {
    getAll: () => Promise<Entity[]>
    save: (entity: Entity) => Promise<Entity | null>
    update: (entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>
    delete: (id: string) => Promise<void | null>
    getById: (id: string) => Promise<Entity | null>
}

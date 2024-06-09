import { ShopEntity as Entity } from '../entities'

export interface ShopRepository {
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>

    save: (entity: Entity) => Promise<Entity | null>
    update_image: (shop_id: string, image_id: string) => Promise<Entity | null>
    update: (id: string, entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>

    delete: (id: string) => Promise<void | null>
}

import { ProductEntity as Entity } from '../entities'

export interface ProductRepository {
    getAll: (shop_id: string, page: number, pageSize: number, sortBy: string, sortOrder: 'ASC' | 'DESC', priceRange: string, search: string) => Promise<{ rows: Entity[], count: number }>
    getById: (id: string) => Promise<Entity | null>
    getNextCode: (shop_id: string) => Promise<string | null>

    
    save: (entity: Entity) => Promise<Entity | null>
    update: (id: string, entity: Entity) => Promise<Entity | null>
    update_add_images: (id : string, image_ids: string[]) => Promise<Entity | null>
    update_delete_images: (id : string, image_ids: string[]) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>

    delete: (id: string) => Promise<void | null>
}
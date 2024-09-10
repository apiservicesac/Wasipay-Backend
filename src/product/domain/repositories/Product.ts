import { ProductEntity as Entity } from '../entities'

export interface ProductRepository {
    getAll: (shop_id: string, page: number, pageSize: number) => Promise<{ rows: Entity[], count: number }>
    getById: (id: string) => Promise<Entity | null>
}
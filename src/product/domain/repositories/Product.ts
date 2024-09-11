import { ProductEntity as Entity } from '../entities'

export interface ProductRepository {
    getAll: (shop_id: string, page: number, pageSize: number, sortBy: string, sortOrder: 'ASC' | 'DESC', priceRange: string, search: string) => Promise<{ rows: Entity[], count: number }>
    getById: (id: string) => Promise<Entity | null>
}
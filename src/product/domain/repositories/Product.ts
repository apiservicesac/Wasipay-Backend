import { ProductEntity as Entity } from '../entities'

export interface ProductRepository {
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
}
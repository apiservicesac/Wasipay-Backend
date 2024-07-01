import { OrderLineEntity as Entity } from '../entities'

export interface OrderLineRepository {
    getById: (id: string) => Promise<Entity | null>
    
    save: (entities: Entity[]) => Promise<Entity[] | null>
    update: (id: string, entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>

    delete: (id: string) => Promise<void | null>
}
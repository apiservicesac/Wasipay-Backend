import { PaymentMethodShopEntity as Entity } from '../entities'

export interface PaymentMethodShopRepository {
    
    save: (shop_id: string, entity: Entity) => Promise<Entity | null>
    update: (id: string, entity: Entity) => Promise<Entity | null>
    update_field: (id : string, field : string, value : any) => Promise<Entity | null>

    delete: (shop_id: string, id: string) => Promise<void | null>
}
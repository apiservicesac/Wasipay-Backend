import { ProductEntity as Entity } from "../entities";

export class ProductDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity._id,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            discount: entity.discount,
            quantity: entity.quantity,
            sku: entity.sku,
            brand: entity.brand,
            product_category: entity.product_category,
            product_type: entity.product_type,
            shop_id: entity.shop_id,
            file_ids: entity.file_ids,
            status: entity.status,
            visibility: entity.visibility,
        };
    }
}
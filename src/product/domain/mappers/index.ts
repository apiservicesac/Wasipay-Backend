import { ProductEntity as Entity } from "../entities";

export class ProductDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity.id,
            title: entity.title,
            price: entity.price,
            price_offer: entity.price_offer,
            price_card: entity.price_card,
            discount: entity.discount,
            brand: entity.brand,
            url: entity.url,
            category_main: entity.category_main,
            category: entity.category,
            subcategory: entity.subcategory,
            // shop_id: entity.shop_id,
            image: entity.image,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}

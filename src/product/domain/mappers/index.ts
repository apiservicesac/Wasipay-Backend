import { ImageDtoMapper } from "@/image_uploader/domain/mappers";
import { ProductEntity as Entity } from "../entities";

export class ProductDtoMapper {

    static toJson(entity: Entity): any {
        return {
            id: entity._id,
            name: entity.name,
            product_code: entity.product_code,
            description: entity.description,
            price: entity.price,
            discount: entity.discount,
            quantity: entity.quantity,
            sku: entity.sku,
            brand: entity.brand,
            product_category: entity.product_category,
            product_type: entity.product_type,
            product_tax: entity.product_tax,            
            tags: entity.tags,
            publish_date_time: entity.publish_date_time,
            shop_id: entity.shop_id,
            images: entity.images ? entity.images.map((image) => ImageDtoMapper.toJson(image)) : null,
            status: entity.status,
            visibility: entity.visibility,
        };
    }
}
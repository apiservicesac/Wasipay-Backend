import { ProductEntity } from "@/product/domain/entities";

export interface OrderLineEntity {
    _id?: string;
    order_id?: string;
    product_id?: string | ProductEntity;
    quantity?: number;
    unit_price?: number;
    total_price?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
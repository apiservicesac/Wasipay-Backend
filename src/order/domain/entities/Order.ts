import { AddressEntity } from "@/address/domain/entities";
import { OrderStatus } from "../enums";
import { OrderLineEntity } from "./OrderLine";
import { OrderPaymentEntity } from "./OrderPayment";

export interface OrderEntity {
    _id?: string;
    order_code?: string;
    shop_id?: string;
    customer?: string;
    order_date?: Date;
    status?: OrderStatus;
    total_amount?: number;
    payment?: string | OrderPaymentEntity;
    shipping_address?: string | AddressEntity;
    billing_address?: string | AddressEntity;
    order_lines?: string[] | OrderLineEntity[];
    createdAt?: Date;
    updatedAt?: Date;
}

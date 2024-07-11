import { ProductDtoMapper } from "@/product/domain/mappers";
import { OrderEntity, OrderLineEntity } from "../entities";
import { ProductEntity } from "@/product/domain/entities";
import { AddressDtoMapper } from "@/address/domain/mappers";
import { AddressEntity } from "@/address/domain/entities";
import { UserEntity } from "@/user/domain/entities";
import { UserDtoMapper } from "@/user/domain/mappers";

export class OrderLineDtoMapper {

    static toJson(orderLine: OrderLineEntity): any {
        return {
            id: orderLine._id,
            order_id: orderLine.order_id,
            product_id: OrderLineDtoMapper.isProductEntity(orderLine.product_id) ? ProductDtoMapper.toJson(orderLine.product_id) : orderLine.product_id,
            quantity: orderLine.quantity,
            unit_price: orderLine.unit_price,
            total_price: orderLine.total_price,
        };
    }

    static isProductEntity(product_id?: string | ProductEntity): product_id is ProductEntity {
        return (product_id as ProductEntity)?._id !== undefined && (product_id as ProductEntity)?._id !== null;
    }
}

export class OrderDtoMapper {

    static toJson(order: OrderEntity): any {
        return {
            id: order._id,
            order_code: order.order_code,
            customer: this.isCustomerEntity(order.customer)? UserDtoMapper.toJson(order.customer) : order.customer,
            order_date: order.order_date ? order.order_date.toLocaleString('es-PE') : null,
            status: order.status,
            total_amount: order.total_amount,
            shipping_address: this.isAddressEntity(order.shipping_address) ? AddressDtoMapper.toJson(order.shipping_address) : order.shipping_address,
            billing_address: this.isAddressEntity(order.billing_address) ? AddressDtoMapper.toJson(order.billing_address) : order.billing_address,
            order_lines: this.isOrderLineEntity(order.order_lines) ? order.order_lines.map((line) => OrderLineDtoMapper.toJson(line)) : order.order_lines
        };
    }

    static isOrderLineEntity(order_lines?: string[] | OrderLineEntity[]): order_lines is OrderLineEntity[] {
        if (Array.isArray(order_lines) && order_lines.length !== 0) {
            if (typeof order_lines[0] === 'string') {
                return false;
            }
            if (typeof order_lines[0] === 'object') {
                return true
            }
        }
        return false;
    }

    static isCustomerEntity(customer?: string | UserEntity): customer is UserEntity {
        return (customer as UserEntity)?._id !== undefined && (customer as UserEntity)?._id !== null;
    }

    static isAddressEntity(address?: string | AddressEntity): address is AddressEntity {
        return (address as AddressEntity)?._id !== undefined && (address as AddressEntity)?._id !== null;
    }
}


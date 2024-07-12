import { ProductDtoMapper } from "@/product/domain/mappers";
import { OrderEntity, OrderLineEntity, OrderPaymentEntity } from "../entities";
import { ProductEntity } from "@/product/domain/entities";
import { AddressDtoMapper } from "@/address/domain/mappers";
import { AddressEntity } from "@/address/domain/entities";
import { UserEntity } from "@/user/domain/entities";
import { UserDtoMapper } from "@/user/domain/mappers";
import { PaymentMethodEntity } from "@/payment_method/domain/entities";
import { PaymentMethodDtoMapper } from "@/payment_method/domain/mappers";
import { ImageDtoMapper } from "@/image_uploader/domain/mappers";

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
            payment: this.isOrderPaymentEntity(order.payment) ? OrderPaymentDtoMapper.toJson(order.payment) : order.payment,
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

    static isOrderPaymentEntity(order_payment?: string | OrderPaymentEntity): order_payment is OrderPaymentEntity {
        return (order_payment as OrderPaymentEntity)?._id !== undefined && (order_payment as OrderPaymentEntity)?._id !== null;
    }

    static isCustomerEntity(customer?: string | UserEntity): customer is UserEntity {
        return (customer as UserEntity)?._id !== undefined && (customer as UserEntity)?._id !== null;
    }

    static isAddressEntity(address?: string | AddressEntity): address is AddressEntity {
        return (address as AddressEntity)?._id !== undefined && (address as AddressEntity)?._id !== null;
    }
}

export class OrderPaymentDtoMapper {
    static toJson(order_payment: OrderPaymentEntity): any {
        return {
            id: order_payment._id,
            payment_method: this.isAddressEntity(order_payment.payment_method) ? PaymentMethodDtoMapper.toJson(order_payment.payment_method) : order_payment.payment_method,
            image: order_payment.image ? ImageDtoMapper.toJson(order_payment.image) : null,
        }
    }

    static isAddressEntity(payment_method?: string | PaymentMethodEntity): payment_method is PaymentMethodEntity {
        return (payment_method as PaymentMethodEntity)?._id !== undefined && (payment_method as PaymentMethodEntity)?._id !== null;
    }
}
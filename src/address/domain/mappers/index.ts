import { AddressEntity } from "../entities";

export class AddressDtoMapper {

    static toJson(address: AddressEntity): any {
        return {
            id: address._id,
            customer_id: address.customer_id,
            street: address.street,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
        };
    }
}
import { PaymentMethodEntity } from "../entities";

export class PaymentMethodDtoMapper {

    static toJson(payment_method: PaymentMethodEntity): any {
        return {
            id: payment_method._id,
            name: payment_method.name,
            description: payment_method.description,
        };
    }
}
import { ImageEntity } from "@/image_uploader/domain/entities";
import { PaymentMethodEntity } from "@/payment_method/domain/entities";
import { CurrencyType } from "../enums";

export interface PaymentMethodShopEntity {
    _id?: string;
    payment_method?: string | PaymentMethodEntity;
    account_number?: string;
    interbank_account_number?: string;
    currency_type?: CurrencyType;
    image?: string | ImageEntity;
    createdAt?: Date;
    updatedAt?: Date;
}

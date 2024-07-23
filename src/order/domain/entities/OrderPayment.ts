import { ImageEntity } from "@/image_uploader/domain/entities";
import { PaymentMethodShopEntity } from "@/payment_method_shop/domain/entities";

export interface OrderPaymentEntity {
    _id?: string;
    payment_method?: string | PaymentMethodShopEntity;
    image?: ImageEntity;    
    createdAt?: Date;
    updatedAt?: Date;
}

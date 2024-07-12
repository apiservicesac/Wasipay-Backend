import { ImageEntity } from "@/image_uploader/domain/entities";
import { PaymentMethodEntity } from "@/payment_method/domain/entities";

export interface OrderPaymentEntity {
    _id?: string;
    payment_method?: string | PaymentMethodEntity;
    image?: ImageEntity;    
    createdAt?: Date;
    updatedAt?: Date;
}

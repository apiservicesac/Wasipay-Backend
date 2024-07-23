import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const OrderPaymentSchema = new conector_mongoose.Schema({
    payment_method: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "PaymentMethodShop",
    },
    image: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Image",        
    },
}, { timestamps: true });

const OrderPaymentMongoose = conector_mongoose.model('OrderPayment', OrderPaymentSchema);

export { OrderPaymentMongoose }
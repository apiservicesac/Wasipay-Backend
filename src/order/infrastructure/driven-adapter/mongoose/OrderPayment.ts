import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const OrderPaymentSchema = new conector_mongoose.Schema({
    payment_method: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "PaymentMethod",
    },
    image: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Image",        
    },
}, { timestamps: true });

const OrderPaymentMongoose = conector_mongoose.model('OrderPayment', OrderPaymentSchema);

export { OrderPaymentMongoose }
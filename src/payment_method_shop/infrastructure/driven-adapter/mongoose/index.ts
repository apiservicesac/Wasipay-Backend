import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const PaymentMethodShopSchema = new conector_mongoose.Schema({
    payment_method: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "PaymentMethod",        
    },
    account_number: {
        type: String,
    },
    interbank_account_number: {
        type: String,
    },
    currency_type: {
        type: String, enum: ['PEN', 'USD'], required: true 
    },
}, { timestamps: true });

const PaymentMethodShopMongoose = conector_mongoose.model('PaymentMethodShop', PaymentMethodShopSchema);

export { PaymentMethodShopMongoose }
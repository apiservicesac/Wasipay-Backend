import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const PaymentMethodSchema = new conector_mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,        
    },
    postal_code: {
        type: String,
    },
}, { timestamps: true });

const PaymentMethodMongoose = conector_mongoose.model('PaymentMethod', PaymentMethodSchema);

export { PaymentMethodMongoose }
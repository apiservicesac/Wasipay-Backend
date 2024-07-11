import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const PaymentMethodSchema = new conector_mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });

const PaymentMethodMongoose = conector_mongoose.model('PaymentMethod', PaymentMethodSchema);

export { PaymentMethodMongoose }
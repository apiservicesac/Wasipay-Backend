import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const AddressSchema = new conector_mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    customer_id: {
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
    coordinates: {
        type: Map,
        of: Number
    },
}, { timestamps: true });

const AddressMongoose = conector_mongoose.model('Address', AddressSchema);

export { AddressMongoose }
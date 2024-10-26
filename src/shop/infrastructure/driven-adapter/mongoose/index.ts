import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const ShopSchema = new conector_mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    image: {
        type: String,
    },
    social_media: {
        type: Map,
        of: String
    },    
}, { timestamps: true });

const ShopMongoose = conector_mongoose.model('Shop', ShopSchema);

export { ShopMongoose }
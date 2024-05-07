import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'
import { v4 as uuidv4 } from 'uuid';

const ShopSchema = new conector_mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    address: String,
    city: String,
    country: String,
    postal_code: String,
    email: String,
    phone: String,
    social_media: {
        type: Map,
        of: String
    },
}, { timestamps: true });

const ShopMongoose = conector_mongoose.model('Shop', ShopSchema);

export { ShopMongoose }
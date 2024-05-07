import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'
import { v4 as uuidv4 } from 'uuid';

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
    postal_code: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    social_media: {
        type: Map,
        of: String
    },
    file: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "File",
    },
}, { timestamps: true });

const ShopMongoose = conector_mongoose.model('Shop', ShopSchema);

export { ShopMongoose }
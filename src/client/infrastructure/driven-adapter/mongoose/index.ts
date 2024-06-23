import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const ClientSchema = new conector_mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    last_name: {
        type: String,
    },
    vat: {
        type: String,
    },
    business_name: {
        type: String,
    },
    address: {
        type: String,
    },
    coordinates: {
        type: Object,
    },
    image: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Image",        
    },
}, { timestamps: true });

const ClientMongoose = conector_mongoose.model('Client', ClientSchema);

export { ClientMongoose }
import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const ImageSchema = new conector_mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ImageMongoose = conector_mongoose.model('Image', ImageSchema);

export { ImageMongoose }
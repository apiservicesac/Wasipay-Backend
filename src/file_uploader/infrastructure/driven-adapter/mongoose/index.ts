import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const FileSchema = new conector_mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const FileMongoose = conector_mongoose.model('File', FileSchema);

export { FileMongoose }
import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const UserSchema = new conector_mongoose.Schema({

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
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['USER_BUSINESS', 'USER_CUSTOMER'],
    },
    shop_id: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Shop",
    },

}, { timestamps: true });

const UserMongoose = conector_mongoose.model('User', UserSchema);

export { UserMongoose }
import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const ProductCategorySchema = new conector_mongoose.Schema({

    name: { 
        type: String, 
        required: true 
    },  
    shop: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Shop",
    },
}, { timestamps: true });

const ProductCategoryMongoose = conector_mongoose.model('Product_Category', ProductCategorySchema);

export { ProductCategoryMongoose }
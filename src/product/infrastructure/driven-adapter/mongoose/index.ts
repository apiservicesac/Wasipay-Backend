import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const ProductSchema = new conector_mongoose.Schema({

    name: { 
        type: String, 
        required: true 
    },
    code_product : { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    quantity: { 
        type: Number, required: true 
    },
    price: { 
        type: Number, required: true 
    },
    discount: { 
        type: Number,        
    },
    sku: { 
        type: String 
    },
    brand: { 
        type: String 
    },
    shop_id: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Shop",
    },
    product_category: { 
        type: String 
    },
    product_type: {
        type: String, enum: ['SINGLE', 'UNIT', 'BOX'], required: true 
    },
    status: { 
        type: String, enum: ['AVAILABLE', 'SOLD_OUT', 'OUT_OF_STOCK'], required: true 
    },
    visibility: { 
        type: String, enum: ['PUBLISHED', 'SCHEDULED', 'HIDDEN'], required: true 
    },  
    images: [
        {
            type: conector_mongoose.Types.ObjectId, 
            ref: "Image",
        }
    ],
}, { timestamps: true });

const ProductMongoose = conector_mongoose.model('Product', ProductSchema);

export { ProductMongoose }
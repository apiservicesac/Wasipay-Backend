import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const OrderSchema = new conector_mongoose.Schema({
    order_code: { 
        type: String, 
        required: true 
    },
    shop_id: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Shop",
    },
    customer_id: { 
        type: String, 
        required: true 
    },
    order_date: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], 
        required: true 
    },
    total_amount: { 
        type: Number, 
        required: true 
    },
    shipping_address: {         
        type: conector_mongoose.Types.ObjectId, 
        ref: "Address",
    },
    billing_address: { 
        type: conector_mongoose.Types.ObjectId, 
        ref: "Address",
    },
    order_lines: [
        {
            type: conector_mongoose.Types.ObjectId, 
            ref: "OrderLine",
        }
    ],

}, { timestamps: true });

const OrderMongoose = conector_mongoose.model('Order', OrderSchema);

export { OrderMongoose }
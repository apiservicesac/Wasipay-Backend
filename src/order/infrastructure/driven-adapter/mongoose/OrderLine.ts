import { mongoose as conector_mongoose } from '@/shared/services/mongo-connector'

const OrderLineSchema = new conector_mongoose.Schema({
    order_id: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Order",
    },
    product_id: {
        type: conector_mongoose.Types.ObjectId, 
        ref: "Product",
    },
    quantity: { 
        type: Number, 
        required: true,
    },
    unit_price: { 
        type: Number, 
        required: true,
    },
    total_price: { 
        type: Number, 
        required: true,
    },

}, { timestamps: true });

const OrderLineMongoose = conector_mongoose.model('OrderLine', OrderLineSchema);

export { OrderLineMongoose }
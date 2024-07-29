import { OrderEntity as Entity } from '@/order/domain/entities'
import { OrderRepository as Repository } from '@/order/domain/repositories'
import { OrderMongoose as Mongoose } from '@/order/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getAll(shop_id: string): Promise<Entity[]> {
        const result = await Mongoose.find({ shop_id: shop_id })
                                .populate({
                                    path: 'payment',
                                    populate: {
                                        path: 'payment_method',
                                        populate: {
                                            path: 'payment_method'
                                        }
                                    }
                                })
                                .populate("customer")
                                .populate("shipping_address")
                                .populate("billing_address")
                                .populate("order_lines");
        const entities: Entity[] = result.map((data: any) => data.toJSON() as Entity);
        return entities;
    }   

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ _id: id })
                                    .populate("payment")
                                    .populate({
                                        path: 'payment',
                                        populate: {
                                            path: 'payment_method'
                                        }
                                    })
                                    .populate("customer_i")
                                    .populate("shipping_address")
                                    .populate("billing_address")
                                    .populate("order_lines");
    
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }

    }

    async getNextCode(shop_id: string): Promise<string | null> {
        try {
            const prefix = 'PROD';
            const date = new Date();
            const dayMonth = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}`;
            

            const lastOrder = await Mongoose.findOne({ shop_id: shop_id, order_code: { $regex: `^${prefix}-${dayMonth}-` } })
                                             .sort({ order_code: -1 })
                                             .exec();
            
            let nextCode;

            if (lastOrder) {
                const entity = lastOrder.toJSON() as Entity
                const lastCode = entity.order_code!;
                const lastSequence = parseInt(lastCode.split('-')[2], 10);
                const nextSequence = String(lastSequence + 1).padStart(3, '0');
                nextCode = `${prefix}-${dayMonth}-${nextSequence}`;
            } else {
                nextCode = `${prefix}-${dayMonth}-001`;
            }
        
            return nextCode;
        }catch(e) {
            return null
        }

    }

    async save (data: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Mongoose.create({
                ...data
            });
            const getEntity = await this.getById((newEntity.toJSON() as Entity)._id!)
            return getEntity
        }catch {
            return null
        }
    }   

    async update(id: string, data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, data, { new: true })
                                            .populate("payment")
                                            .populate({
                                                path: 'payment',
                                                populate: {
                                                    path: 'payment_method'
                                                }
                                            })
                                            .populate("customer")
                                            .populate("shipping_address")
                                            .populate("billing_address")
                                            .populate("order_lines");                        
            
            if (updatedEntity) {
                return updatedEntity.toJSON() as Entity;
            }        
            return null;
        } catch (error) {
            return null;
        }
    }
    
    async update_field(id : string, field: string, value : any): Promise<Entity | null> {        
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, {[field]: value}, { new: true })
                                            .populate("payment")
                                            .populate({
                                                path: 'payment',
                                                populate: {
                                                    path: 'payment_method'
                                                }
                                            })
                                            .populate("customer")                
                                            .populate("shipping_address")
                                            .populate("billing_address")
                                            .populate("order_lines");
            if (updatedEntity) {
                return updatedEntity.toJSON() as Entity;
            }        
            return null;
        } catch (error) {        
            return null;
        }
    }

    async delete (id: string) : Promise<void | null > {
        try {
            await Mongoose.deleteOne({ _id: id });
        }catch (e) {
            return null;
        }        
    }
    
}

export {
    ImplementationMongoose as OrderImplementationMongoose
}

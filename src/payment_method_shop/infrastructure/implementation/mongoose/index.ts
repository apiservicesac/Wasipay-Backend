import { PaymentMethodShopEntity as Entity } from '@/payment_method_shop/domain/entities'
import { PaymentMethodShopRepository as Repository } from '@/payment_method_shop/domain/repositories'
import { PaymentMethodShopMongoose as Mongoose } from '@/payment_method_shop/infrastructure/driven-adapter/mongoose'
import { ShopMongoose } from '@/shop/infrastructure/driven-adapter/mongoose';

class ImplementationMongoose implements Repository {

    async save (shop_id: string, entity: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Mongoose.create({
                ...entity
            });
            const _new = newEntity.toJSON() as Entity
            await ShopMongoose.findOneAndUpdate({ _id: shop_id },{
                $addToSet: { payment_method: { $each: [_new?._id!] } },
            }, { new: true })
            return _new
        }catch(e) {
            return null
        }
    }   

    async update(id: string, data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, data, { new: true });
            
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
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, {[field]: value}, { new: true });            
            if (updatedEntity) {
                return updatedEntity.toJSON() as Entity;
            }        
            return null;
        } catch (error) {
            console.log(error);            
            return null;
        }
    }   

    async delete (shop_id: string, id: string) : Promise<void | null > {
        try {
            await Mongoose.deleteOne({ _id: id });
            await ShopMongoose.findOneAndUpdate({ _id: shop_id },{
                $pull: { payment_method: { $in: [id] } }
            }, { new: true })
        }catch (e) {
            return null;
        }        
    }
    
}

export {
    ImplementationMongoose
}

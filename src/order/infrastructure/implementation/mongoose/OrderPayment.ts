import { OrderPaymentEntity as Entity } from '@/order/domain/entities'
import { OrderPaymentRepository as Repository } from '@/order/domain/repositories'
import { OrderPaymentMongoose as Mongoose } from '@/order/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ _id: id }).populate("product_id");
    
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }

    }

    async save(entity: Entity): Promise<Entity | null> {
        try {
          const newEntity = await Mongoose.create(entity);          
          return newEntity.toJSON() as Entity;
        } catch (error) {
          console.error('Error saving entities:', error);
          return null;
        }
    }
    
    async update(id: string, data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, data, { new: true }).populate("product_id");                    
            
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
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, {[field]: value}, { new: true }).populate("product_id");
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
    ImplementationMongoose as OrderPaymentImplementationMongoose
}

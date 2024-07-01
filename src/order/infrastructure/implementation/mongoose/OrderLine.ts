import { OrderLineEntity as Entity } from '@/order/domain/entities'
import { OrderLineRepository as Repository } from '@/order/domain/repositories'
import { OrderLineMongoose as Mongoose } from '@/order/infrastructure/driven-adapter/mongoose'

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

    async save(entities: Entity[]): Promise<Entity[] | null> {
        try {
          const result = await Mongoose.insertMany(entities);
          const newEntities: Entity[] = result.map((data: any) => data.toJSON() as Entity);
          return newEntities
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
    ImplementationMongoose as ImplementationMongoose
}

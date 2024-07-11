import { PaymentMethodEntity as Entity } from '@/payment_method/domain/entities'
import { PaymentMethodRepository as Repository } from '@/payment_method/domain/repositories'
import { PaymentMethodMongoose as Mongoose } from '@/payment_method/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getAll(): Promise<Entity[]> {
        const result = await Mongoose.find();
        const entities: Entity[] = result.map((data: any) => data.toJSON() as Entity);
        return entities;
    }   

    async save (entity: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Mongoose.create({
                ...entity
            });
            return newEntity.toJSON() as Entity
        }catch(e) {
            console.log(e)
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

    async delete (id: string) : Promise<void | null > {
        try {
            await Mongoose.deleteOne({ _id: id });
        }catch (e) {
            return null;
        }        
    }

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ _id: id })
        
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }
    }
    
}

export {
    ImplementationMongoose
}

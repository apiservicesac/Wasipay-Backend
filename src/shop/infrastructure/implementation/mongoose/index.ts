import { ShopEntity as Entity } from '@/shop/domain/entities'
import { ShopRepository as Repository } from '@/shop/domain/repositories'
import { ShopMongoose as Mongoose } from '@/shop/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getAll(): Promise<Entity[] | null> {
        try {
            const result = await Mongoose.find()                                
            const entities: Entity[] = result.map((data: any) => data.toJSON() as Entity);
            return entities;
        }catch(e) {
            return null
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

    async save (data: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Mongoose.create({
                ...data
            });
            return newEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }
    }   

    async update(id: string, data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, data, { new: true })            
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
}

const mongooseRepository = new ImplementationMongoose()

export {
    mongooseRepository
}
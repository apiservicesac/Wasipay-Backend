import { UserEntity as Entity } from '@/user/domain/entities'
import { UserRepository as Repository } from '@/user/domain/repositories'
import { UserMongoose as Mongoose } from '@/user/infrastructure/driven-adapter/mongoose'

class ImplementationSequelize implements Repository {

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
            return null
        }
    }   

    async update(id: string, data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ id: id }, data, { new: true });
            
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
            const updatedEntity = await Mongoose.findOneAndUpdate({ id: id }, {[field]: value}, { new: true });            
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
            await Mongoose.deleteOne({ id: id });
        }catch (e) {
            return null;
        }        
    }

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ id: id })
        
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }
    }

    async getByEmail(email: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ email })
        
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }

    }
    
}

export {
    ImplementationSequelize
}

import { FileEntity as Entity } from '@/file_uploader/domain/entities'
import { FileUploadRepository as Repository } from '@/file_uploader/domain/repositories'
import { FileMongoose as Mongoose } from '@/file_uploader/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getAll(): Promise<Entity[]> {
        const result = await Mongoose.find();
        const entities: Entity[] = result.map((shop: any) => shop.toJSON() as Entity);
        return entities;
    }   

    async save (data: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Mongoose.create({
                name: data.name,
                url: data.url,
            });
            return newEntity.toJSON() as Entity;
        }catch {
            return null
        }
    }   

    async update(data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: data.id }, data, { new: true });
            
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

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ _id: id });
        
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

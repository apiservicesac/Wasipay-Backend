import { ImageEntity as Entity } from '@/image_uploader/domain/entities'
import { ImageUploadRepository as Repository } from '@/image_uploader/domain/repositories'
import { ImageMongoose as Mongoose } from '@/image_uploader/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getById (id: string): Promise<Entity | null> {
        try{
            const foundEntity = await Mongoose.findOne({ _id: id });
        
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch {
            return null
        }
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

    async delete (ids: string[]) : Promise<void | null > {
        try {
            await Mongoose.deleteMany({ _id: { $in: ids } });
        }catch (e) {
            return null;
        }        
    }   
    
}

export {
    ImplementationMongoose
}

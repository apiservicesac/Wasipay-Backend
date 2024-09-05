import { ImageEntity as Entity } from '@/image_uploader/domain/entities'
import { ImageUploadRepository as Repository } from '@/image_uploader/domain/repositories'
import { FileSequelize as Sequelize } from '@/image_uploader/infrastructure/driven-adapter/sequelize'

class ImplementationSequelize implements Repository {   

    async save (data: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Sequelize.create({
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
            await Sequelize.destroy({ where: { ids } })
        }catch (e) {
            return null;
        }
    }

    async getById(id: string): Promise<Entity | null> {
        const foundEntity = await Sequelize.findOne({ where: { id } });
    
        if (!foundEntity) return null;
    
        return foundEntity.toJSON() as Entity;
    }
    
}

export {
    ImplementationSequelize
}
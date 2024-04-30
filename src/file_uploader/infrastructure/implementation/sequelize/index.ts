import { FileEntity as Entity } from '@/file_uploader/domain/entities'
import { FileUploadRepository as Repository } from '@/file_uploader/domain/repositories'
import { FileSequelize as Sequelize } from '@/file_uploader/infrastructure/driven-adapter/sequelize'
import { sequelize } from '@/shared/services/sequelize-conector';

class ImplementationSequelize implements Repository {

    async getAll(): Promise<Entity[]> {
        const result = await Sequelize.findAll();
        const entities: Entity[] = result.map((sequelize: Sequelize) => sequelize.toJSON() as Entity);
        return entities;
    }    

    async save (urls: string[], tableName: string, fid: string): Promise<boolean> {
        try{          
            const urlsArray = urls.map(url => `'${url}'`).join(', ');

            const updateQuery = `
                UPDATE "${tableName}"
                SET imagenes = ARRAY[${urlsArray}]
                WHERE fid = ${fid};
            `;

            await sequelize.query(updateQuery);
            return true
        }catch(e) {            
            return false
        }
    }   

    async update(data: Entity): Promise<Entity | null> {
        const [affectedCount, updatedEntities] = await Sequelize.update(data, { where: { id: data.id }, returning: true });
        
        if (affectedCount > 0 && updatedEntities.length > 0) {
            return updatedEntities[0].toJSON() as Entity;
        }
    
        return null;
    }   

    async delete (id: string) : Promise<void | null > {
        try {
            await Sequelize.destroy({ where: { id } })
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
import { Op } from 'sequelize';
import { ImageSequelize } from '@/image_uploader/infrastructure/driven-adapter/sequelize';
import { ShopEntity as Entity } from '@/shop/domain/entities'
import { ShopRepository as Repository } from '@/shop/domain/repositories'
import { ShopSequelize as Sequelize } from '@/shop/infrastructure/driven-adapter/sequelize'

class ImplementationSequelize implements Repository {

    async getAll(): Promise<Entity[]> {
        const result = await Sequelize.findAll({
            include: [{ model: ImageSequelize, as: 'image' }],
            // where: {
            //     id: { [Op.ne]: process.env.SHOP_ID },
            // },
        });
        const entities: Entity[] = result.map((sequelize: Sequelize) => sequelize.toJSON() as Entity);
        return entities;
    }    

    async save (data: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Sequelize.create({
                ...data
            });
            return newEntity.toJSON() as Entity;
        }catch {
            return null
        }
    }   

    async update(id: string, data: Entity): Promise<Entity | null> {
        const [affectedCount, updatedEntities] = await Sequelize.update(data, { where: { id: id }, returning: true });
        
        if (affectedCount > 0 && updatedEntities.length > 0) {
            return updatedEntities[0].toJSON() as Entity;
        }
    
        return null;
    }   
    
    async update_field(id : string, field: string, value : any): Promise<Entity | null> {        
        try {
            const [affectedCount, updatedEntities] = await Sequelize.update({[field] : value }, { where: { id }, returning: true, });        
            if (affectedCount > 0 && updatedEntities.length > 0) {
                return updatedEntities[0].toJSON() as Entity;
            }        
            return null;
        } catch(e) {
            return null
        }
    }

    async update_image(id : string, image_id: string): Promise<Entity | null> {     
        try {            
            const [affectedCount, updatedEntities] = await Sequelize.update({ image_id: image_id }, { where: { id: id }, returning: true });

            if (affectedCount > 0 && updatedEntities.length > 0) {                
                return await this.getById(id)
            }        
            return null;
        } catch(e) {
            return null
        }   
        
    }   

    async delete (id: string) : Promise<void | null > {
        try {
            await Sequelize.destroy({ where: { id } })
        }catch (e) {
            return null;
        }
    }

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Sequelize.findOne({ where: { id }, include: [{ model: ImageSequelize, as: 'image' }] });
            if (!foundEntity) return null;    
            return foundEntity.toJSON() as Entity;
        }catch (e) {
            return null;
        }        
    }
    
}

export {
    ImplementationSequelize
}
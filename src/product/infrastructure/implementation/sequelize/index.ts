import { ProductEntity as Entity } from '@/product/domain/entities'
import { ProductRepository as Repository } from '@/product/domain/repositories'
import { ProductSequelize as Sequelize } from '@/product/infrastructure/driven-adapter/sequelize'

class ImplementationSequelize implements Repository {

    async getAll(shop_id: string, page: number, pageSize: number): Promise<{ rows: Entity[], count: number }> {
        const offset = (page - 1) * pageSize;
        const result = await Sequelize.findAndCountAll({
            where: { shop_id: shop_id },
            limit: pageSize,
            offset: offset
        });
    
        const entities: Entity[] = result.rows.map((sequelize: Sequelize) => sequelize.toJSON() as Entity);
        return { rows: entities, count: result.count };
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
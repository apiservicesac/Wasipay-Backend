import { ProductEntity as Entity } from '@/product/domain/entities';
import { ProductRepository as Repository } from '@/product/domain/repositories';
import { ProductSequelize as Sequelize } from '@/product/infrastructure/driven-adapter/sequelize';
import { Op, literal } from 'sequelize';

class ImplementationSequelize implements Repository {
    async getAll(
        shop_id: string,
        page: number,
        pageSize: number,
        sortBy: string,
        sortOrder: 'ASC' | 'DESC',
        priceRange: string = '',
        search: string = ''
    ): Promise<{ rows: Entity[], count: number }> {
        console.log(shop_id, page, pageSize, sortBy, sortOrder, priceRange, search)
        const offset = (page - 1) * pageSize;

        const [minPrice, maxPrice] = priceRange.split('-').map(Number);

        const result = await Sequelize.findAndCountAll({
            where: {
                shop_id: shop_id,
                ...(minPrice && maxPrice ? { price: { [Op.between]: [minPrice, maxPrice] } } : {}),
                ...(search ? { title: { [Op.iLike]: `%${search}%` } } : {})
            },
            order: [
                [literal(`CASE WHEN TRIM(${sortBy}) = '' THEN NULL ELSE CAST(TRIM(${sortBy}) AS INTEGER) END`), sortOrder]
            ],
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

export { ImplementationSequelize };

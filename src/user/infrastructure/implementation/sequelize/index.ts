import { UserEntity as Entity } from '@/user/domain/entities'
import { UserDtoMapper } from '@/user/domain/mappers';
import { UserRepository as Repository } from '@/user/domain/repositories'
import { UserSequelize as Sequelize } from '@/user/infrastructure/driven-adapter/sequelize'

class ImplementationSequelize implements Repository {

    async getAll(): Promise<Entity[]> {
        const result = await Sequelize.findAll();
        const entities: Entity[] = result.map((sequelize: Sequelize) => UserDtoMapper.fromDto(sequelize.toJSON()));
        return entities;
    }    

    async save (data: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Sequelize.create({
                ...data
            });     
            return UserDtoMapper.fromDto(newEntity.toJSON());
        }catch(e) {
            return null
        }
    }   

    async update(id: string, data: Entity): Promise<Entity | null> {
        const [affectedCount, updatedEntities] = await Sequelize.update(data, { where: { id: id }, returning: true });
        
        if (affectedCount > 0 && updatedEntities.length > 0) {
            return UserDtoMapper.fromDto(updatedEntities[0].toJSON());
        }
    
        return null;
    }   
    
    async update_field(id : string, field: string, value : any): Promise<Entity | null> {        
        const [affectedCount, updatedEntities] = await Sequelize.update({[field] : value }, { where: { id }, returning: true });        
        if (affectedCount > 0 && updatedEntities.length > 0) {
            return UserDtoMapper.fromDto(updatedEntities[0].toJSON());
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
        try {
            const foundEntity = await Sequelize.findOne({ where: { id } });
    
            if (!foundEntity) return null;

            return UserDtoMapper.fromDto(foundEntity.toJSON());
        }catch {
            return null;
        }
    }

    async getByEmail(email: string): Promise<Entity | null> {
        try {
            const foundEntity = await Sequelize.findOne({ where: { email } });
    
            if (!foundEntity) return null;

            return UserDtoMapper.fromDto(foundEntity.toJSON());
        }catch {
            return null;
        }
    }
    
}

export {
    ImplementationSequelize
}
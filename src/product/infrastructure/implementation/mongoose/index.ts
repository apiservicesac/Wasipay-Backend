import { ProductEntity as Entity } from '@/product/domain/entities'
import { ProductRepository as Repository } from '@/product/domain/repositories'
import { ProductMongoose as Mongoose } from '@/product/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getAll(
        shop_id: string,
        page: number,
        pageSize: number,
        sortBy: string,
        sortOrder: 'ASC' | 'DESC',
        priceRange: string = '',
        search: string = ''
    ): Promise<{ rows: Entity[], count: number }> {
    
        const offset = (page - 1) * pageSize;
    
        // Extraer los valores mínimo y máximo del rango de precios
        const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [null, null];
    
        // Crear el objeto de filtro de búsqueda
        const query: any = {
            shop_id: shop_id,
            ...(minPrice && maxPrice ? { price: { $gte: minPrice, $lte: maxPrice } } : {}),
            ...(search ? { name: { $regex: search, $options: 'i' } } : {}) // búsqueda insensible a mayúsculas/minúsculas
        };
    
        // Obtener la cantidad total de registros que coinciden con los filtros
        const count = await Mongoose.countDocuments(query);
    
        // Ejecutar la consulta con paginación, ordenación y filtros
        const result = await Mongoose.find(query)
            .populate('images')
            .sort({ [sortBy]: sortOrder === 'ASC' ? 1 : -1 })  // Ordenar según el campo especificado
            .skip(offset)
            .limit(pageSize);
    
        const entities: Entity[] = result.map((data: any) => data.toJSON() as Entity);
    
        return { rows: entities, count };
    }
    

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ _id: id }).populate("images");
        
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }

    }

    async getNextCode(shop_id: string): Promise<string | null> {
        try {
            const prefix = 'PROD';
            const date = new Date();
            const dayMonth = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}`;
            

            const lastProduct = await Mongoose.findOne({ shop_id: shop_id, product_code: { $regex: `^${prefix}-${dayMonth}-` } })
                                             .sort({ product_code: -1 })
                                             .exec();
            
            let nextCode;

            if (lastProduct) {
                const entity = lastProduct.toJSON() as Entity
                const lastCode = entity.product_code!;
                const lastSequence = parseInt(lastCode.split('-')[2], 10);
                const nextSequence = String(lastSequence + 1).padStart(3, '0');
                nextCode = `${prefix}-${dayMonth}-${nextSequence}`;
            } else {
                nextCode = `${prefix}-${dayMonth}-001`;
            }
        
            return nextCode;
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
        }catch {
            return null
        }
    }   

    async update(id: string, data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, data, { new: true }).populate("images");
            
            if (updatedEntity) {
                return updatedEntity.toJSON() as Entity;
            }        
            return null;
        } catch (error) {
            return null;
        }
    }   
    
    async update_add_images(id: string, image_ids: string[]): Promise<Entity | null> {        
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id },{
                $addToSet: { images: { $each: image_ids } },
            }, { new: true }).populate("images");        
            if (updatedEntity) {
                return updatedEntity.toJSON() as Entity;
            }        
            return null;
        } catch (error) {       
            return null;
        }
    }

    async update_delete_images(id: string, image_ids: string[]): Promise<Entity | null> {        
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id },{
                $pull: { images: { $in: image_ids } }
            }, { new: true }).populate("images");        
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
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, {[field]: value}, { new: true }).populate("images");        
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
    
}

export {
    ImplementationMongoose
}

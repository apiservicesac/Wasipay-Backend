import { ProductEntity as Entity } from '@/product/domain/entities'
import { ProductRepository as Repository } from '@/product/domain/repositories'
import { ProductMongoose as Mongoose } from '@/product/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getAll(shop_id: string): Promise<Entity[]> {
        const result = await Mongoose.find({ shop_id: shop_id }).populate("images");
        const entities: Entity[] = result.map((data: any) => data.toJSON() as Entity);
        return entities;
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
            

            const lastProduct = await Mongoose.findOne({ shop_id: shop_id, code_product: { $regex: `^${prefix}-${dayMonth}-` } })
                                             .sort({ code_product: -1 })
                                             .exec();
            
            let nextCode;

            if (lastProduct) {
                const entity = lastProduct.toJSON() as Entity
                const lastCode = entity.code_product!;
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

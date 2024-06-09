import { NextFunction, Request, Response } from 'express'

import { GetByIdUseCase, UpdateImageUseCase } from '@/shop/application/use_cases';
import { ImplementationMongoose } from '@/shop/infrastructure/implementation/mongoose';

import { RemoveImageUseCase, SaveImageUseCase } from '@/image_uploader/application/use_case';
import { ImplementationMongoose as ImplementationImageUploader } from '@/image_uploader/infrastructure/implementation/mongoose';
import { CreateEntityException } from '@/shared/exceptions';


export const updateImageController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = req?.files?.images;

        const { id: shop_id } = req.params;

        const mongooseRepository = new ImplementationMongoose()
        const mongooseImageUploaderRepository = new ImplementationImageUploader()
        
        const findEntity = new GetByIdUseCase(mongooseRepository)        
        const entity :any = await findEntity.run(shop_id)

        const saveImageUseCase = new SaveImageUseCase(mongooseImageUploaderRepository)
        const images_entities = await saveImageUseCase.run(images)

        if(images_entities.length === 0) throw new CreateEntityException()
        
        // Update Image Shop
        const useCase = new UpdateImageUseCase(mongooseRepository)        
        const datUpdated = await useCase.run(shop_id, images_entities[0]._id!)
        
        if(entity.image){
            // Delete Images
            const deleteImageUseCase = new RemoveImageUseCase(mongooseImageUploaderRepository)
            await deleteImageUseCase.run([entity.image.id])            
        }

        res.status(200).json({
            status: 'updated',
            code: 200,
            message: 'Registro Actualizado Correctamente',
            data: datUpdated
        })

    } catch (error) {
        next(error)
    }
}

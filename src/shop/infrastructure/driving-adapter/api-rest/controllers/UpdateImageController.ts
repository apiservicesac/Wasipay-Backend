import { NextFunction, Request, Response } from 'express'

import { UpdateImageUseCase } from '@/shop/application/use_cases';
import { ImplementationMongoose } from '@/shop/infrastructure/implementation/mongoose';

import { SaveImageUseCase } from '@/image_uploader/application/use_case';
import { ImplementationMongoose as ImplementationImageUploader } from '@/image_uploader/infrastructure/implementation/mongoose';
import { CreateEntityException } from '@/shared/exceptions';


export const updateImageController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = req?.files?.images;

        const { id: shop_id } = req.params;
        
        const mongooseImageUploaderRepository = new ImplementationImageUploader()
        const saveImageUseCase = new SaveImageUseCase(mongooseImageUploaderRepository)
        const images_entities = await saveImageUseCase.run(images)

        if(images_entities.length === 0) throw new CreateEntityException()
        
        
        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UpdateImageUseCase(mongooseRepository)        
        const datUpdated = await useCase.run(shop_id, images_entities[0]._id!)

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

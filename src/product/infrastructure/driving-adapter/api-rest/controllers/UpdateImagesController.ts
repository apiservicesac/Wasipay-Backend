import { NextFunction, Request, Response } from 'express'

import { ProductEntity as Entity } from '@/product/domain/entities';
import { AddImagesdUseCase, DeleteImagesdUseCase } from '@/product/application/use_cases';
import { ImplementationMongoose } from '@/product/infrastructure/implementation/mongoose';

import { SaveImageUseCase, DeleteUseCase } from '@/image_uploader/application/use_case';
import { ImplementationMongoose as ImplementationImageUploader } from '@/image_uploader/infrastructure/implementation/mongoose';
import { CreateEntityException } from '@/shared/exceptions';


export const updateImagesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = req?.files?.images;

        const { image_delete_ids } = req.body;

        const { id: product_id  } = req.params;
        
        const mongooseImageUploaderRepository = new ImplementationImageUploader()
        const mongooseRepository = new ImplementationMongoose()

        const delete_ids : string[] | null = image_delete_ids ? JSON.parse(image_delete_ids) : null
        
        if(delete_ids && delete_ids.length !== 0){
            // Delete Images Product
            const useCase = new DeleteImagesdUseCase(mongooseRepository)
            await useCase.run(product_id, delete_ids)

            // Delete Images
            const deleteImageUseCase = new DeleteUseCase(mongooseImageUploaderRepository)
            await deleteImageUseCase.run(delete_ids)                        
        }

        // Add New Images
        const saveImageUseCase = new SaveImageUseCase(mongooseImageUploaderRepository)
        const images_entities = await saveImageUseCase.run(images)

        if(images_entities.length === 0) throw new CreateEntityException()
        
        const image_add_ids = images_entities.flatMap((image) => image._id!)

        // Add New Images Product
        const addImageUseCase = new AddImagesdUseCase(mongooseRepository)
        const dataUpdated : Entity = await addImageUseCase.run(product_id, image_add_ids)

        res.status(200).json({
            status: 'updated',
            code: 200,
            message: 'Registro Actualizado Correctamente',
            data: dataUpdated
        })

    } catch (error) {
        next(error)
    }
}

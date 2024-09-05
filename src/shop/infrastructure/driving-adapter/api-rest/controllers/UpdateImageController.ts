import { NextFunction, Request, Response } from 'express'

import { GetByIdUseCase, UpdateImageUseCase } from '@/shop/application/use_cases';
import { ImplementationSequelize } from '@/shop/infrastructure/implementation/sequelize';

import { RemoveImageUseCase, SaveImageUseCase } from '@/image_uploader/application/use_case';
import { ImplementationSequelize as ImplementationImageUploader } from '@/image_uploader/infrastructure/implementation/sequelize';
import { UploadedFile } from 'express-fileupload';


export const updateImageController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const image = req?.files?.image;

        const { id: shopid } = req.params;

        const repository = new ImplementationSequelize()
        const mongooseImageUploaderRepository = new ImplementationImageUploader()
        
        const findEntity = new GetByIdUseCase(repository)        
        const entity :any = await findEntity.run(shopid)

        const saveImageUseCase = new SaveImageUseCase(mongooseImageUploaderRepository)
        const image_entity = await saveImageUseCase.run(entity.id.toString(), 'profile', null, image as UploadedFile)
        
        // Update Image Shop
        const useCase = new UpdateImageUseCase(repository)        
        const datUpdated = await useCase.run(shopid, image_entity.id!)
        
        if(entity.image){
            // Delete Images
            const deleteImageUseCase = new RemoveImageUseCase(mongooseImageUploaderRepository)            
            await deleteImageUseCase.run(entity.image.id)            
        }

        res.status(200).json({
            status: 'updated',
            code: 200,
            message: 'Registro Actualizado Correctamente',
            data: datUpdated
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

import { NextFunction, Request, Response } from 'express'

import { UpdateUseCase as UseCase } from '@/payment_method_shop/application/use_cases';
import { ImplementationMongoose } from '@/payment_method_shop/infrastructure/implementation/mongoose';
import { PaymentMethodShopEntity } from '@/payment_method_shop/domain/entities';

import { ImplementationMongoose as ImplementationImageUploader } from '@/image_uploader/infrastructure/implementation/mongoose';
import { RemoveImageUseCase, SaveImageUseCase } from '@/image_uploader/application/use_case';
import { CreateEntityException } from '@/shared/exceptions';


export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = req?.files?.images;

        const entityId = req.params.id;        
        let body_data = req.body;

        if (images) {
            const mongooseImageUploaderRepository = new ImplementationImageUploader()
            if(body_data.image_delete_id){
                // Delete Images
                const deleteImageUseCase = new RemoveImageUseCase(mongooseImageUploaderRepository)
                await deleteImageUseCase.run([body_data.image_delete_id])
            }

            const saveImageUseCase = new SaveImageUseCase(mongooseImageUploaderRepository)
            const images_entities = await saveImageUseCase.run(body_data.shop_id, 'shop_payments', null, images)
            if (images_entities.length === 0) throw new CreateEntityException()
            body_data = {...body_data, image: images_entities[0]._id}
        }
        
        const sequelizeRepository = new ImplementationMongoose()
        const useCase = new UseCase(sequelizeRepository)
        const dataUpdated: PaymentMethodShopEntity = await useCase.run(entityId, body_data)

        res.status(200).json({
            status: 'updated',
            code: 200,
            message: 'Registro Actualizado Correctamente',
            data: dataUpdated
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

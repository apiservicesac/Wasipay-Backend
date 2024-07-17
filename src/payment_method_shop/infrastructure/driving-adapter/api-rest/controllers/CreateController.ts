import { NextFunction, Request, Response } from 'express'

import { PaymentMethodShopEntity as Entity } from '@/payment_method_shop/domain/entities';
import { CreateUseCase as UseCase } from '@/payment_method_shop/application/use_cases';
import { ImplementationMongoose } from '@/payment_method_shop/infrastructure/implementation/mongoose';

import { ImplementationMongoose as ImplementationImageUploader } from '@/image_uploader/infrastructure/implementation/mongoose';
import { SaveImageUseCase } from '@/image_uploader/application/use_case';
import { CreateEntityException } from '@/shared/exceptions';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = req?.files?.images;

        const { shop_id } = req.params;
        let body_data : Entity = req.body;

        if (images) {
            const mongooseImageUploaderRepository = new ImplementationImageUploader()
            const saveImageUseCase = new SaveImageUseCase(mongooseImageUploaderRepository)
            const images_entities = await saveImageUseCase.run(shop_id, 'shop_payments', null, images)
            if (images_entities.length === 0) throw new CreateEntityException()
            body_data = {...body_data, image: images_entities[0]._id}
        }

        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const dataCreated = await useCase.run(shop_id, body_data)
        
        res.status(201).json({
            status: 'created',
            code: 201,
            message: 'Registro Creado Correctamente',
            data: dataCreated
        })

    } catch (error) {
        next(error)
    }
}

import { NextFunction, Request, Response } from 'express'

import { PaymentMethodShopEntity as Entity } from '@/payment_method_shop/domain/entities';
import { CreateUseCase as UseCase } from '@/payment_method_shop/application/use_cases';
import { ImplementationMongoose } from '@/payment_method_shop/infrastructure/implementation/mongoose';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {        
        const { shop_id } = req.params;
        const body_data : Entity = req.body;
                
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

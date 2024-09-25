import { NextFunction, Request, Response } from 'express'

import { UpdateUseCase as UseCase } from '@/payment_method_shop/application/use_cases';
import { ImplementationMongoose } from '@/payment_method_shop/infrastructure/implementation/mongoose';
import { PaymentMethodShopEntity } from '@/payment_method_shop/domain/entities';


export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const entityId = req.params.id;        
        let body_data = req.body;

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

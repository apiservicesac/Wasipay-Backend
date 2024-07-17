import { NextFunction, Request, Response } from 'express'

import { UpdateUseCase as UseCase } from '@/payment_method/application/use_cases';
import { ImplementationMongoose } from '@/payment_method/infrastructure/implementation/mongoose';
import { PaymentMethodEntity } from '@/payment_method/domain/entities';

export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;        
        const body_data = req.body;

        const sequelizeRepository = new ImplementationMongoose()
        const useCase = new UseCase(sequelizeRepository)
        const dataUpdated: PaymentMethodEntity = await useCase.run(entityId, body_data)

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

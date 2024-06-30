import { NextFunction, Request, Response } from 'express'

import { OrderEntity as Entity } from '@/order/domain/entities';
import { UpdateFieldUseCase as UseCase } from '@/order/application/use_cases/order';
import { OrderImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';

export const updateFieldController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const { field, value } = req.body;
        
        const mongooseRepository = new OrderImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const datUpdated : Entity = await useCase.run(entityId, field, value)

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

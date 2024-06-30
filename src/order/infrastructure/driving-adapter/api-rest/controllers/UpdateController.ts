import { NextFunction, Request, Response } from 'express'

import { OrderEntity as Entity } from '@/order/domain/entities';
import { UpdateUseCase as UseCase } from '@/order/application/use_cases/order';
import { OrderImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';

export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;
        
        const body_data = req.body;

        const data : Entity = {
            ...body_data,           
        }
        
        const mongooseRepository = new OrderImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const datUpdated = await useCase.run(entityId, data)

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

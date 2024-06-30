import { NextFunction, Request, Response } from 'express'

import { DeleteUseCase as UseCase } from '@/order/application/use_cases/order';
import { OrderImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';

export const deleteController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const entityId = req.params.id;

        const mongooseRepository = new OrderImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        
        await useCase.run(entityId)

        res.status(200).json({
            status: 'deleted',
            code: 200,
            message: 'Registro Eliminado Correctamente',
            data: null
        })

    } catch (error) {
        next(error)
    }
}

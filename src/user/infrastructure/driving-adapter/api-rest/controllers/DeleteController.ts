import { NextFunction, Request, Response } from 'express'

import { DeleteUseCase as UseCase } from '@/user/application/use_cases';
import { ImplementationMongoose } from '@/user/infrastructure/implementation/mongoose';

export const deleteController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const entityId = req.params.id;

        const mongooseRepository = new ImplementationMongoose()
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

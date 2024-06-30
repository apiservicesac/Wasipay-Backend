import { NextFunction, Request, Response } from 'express'

import { DeleteUseCase as UseCase } from '@/address/application/use_cases';
import { ImplementationMongoose } from '@/address/infrastructure/implementation/mongoose';

export const deleteController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const entityId = req.params.id;

        const sequelizeRepository = new ImplementationMongoose()
        const useCase = new UseCase(sequelizeRepository)
        
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

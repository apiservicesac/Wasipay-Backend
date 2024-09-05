import { NextFunction, Request, Response } from 'express'

import { DeleteUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationSequelize } from '@/shop/infrastructure/implementation/sequelize';

export const deleteController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const entityId = req.params.id;

        const repository = new ImplementationSequelize()
        const useCase = new UseCase(repository)
        
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
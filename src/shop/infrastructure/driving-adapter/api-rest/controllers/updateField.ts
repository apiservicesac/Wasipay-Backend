import { NextFunction, Request, Response } from 'express'

import { UpdateFieldUseCase as UseCase } from '@/shop/application/use_cases';
import { mongooseRepository } from '@/shop/infrastructure/implementation/mongoose';

export const updateFieldController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const { field, value } = req.body;
        
        const useCase = new UseCase(mongooseRepository)
        const datUpdated = await useCase.run(entityId, field, value)

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

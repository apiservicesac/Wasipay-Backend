import { NextFunction, Request, Response } from 'express'

import { ProductEntity as Entity } from '@/product/domain/entities';
import { UpdateFieldUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationMongoose } from '@/product/infrastructure/implementation/mongoose';

export const updateFieldController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const { field, value } = req.body;
        
        const mongooseRepository = new ImplementationMongoose()
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

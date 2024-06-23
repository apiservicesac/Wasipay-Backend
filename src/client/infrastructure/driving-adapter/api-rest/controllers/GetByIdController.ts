import { NextFunction, Request, Response } from 'express'

import { ClientEntity as Entity } from '@/client/domain/entities';
import { GetByIdUseCase as UseCase } from '@/client/application/use_cases';
import { ImplementationMongoose } from '@/client/infrastructure/implementation/mongoose';

export const getByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const entity : Entity | null = await useCase.run(entityId)

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Registro Recuperado Correctamente',
            data: entity

        })

    } catch (error) {
        next(error)
    }
}

import { NextFunction, Request, Response } from 'express'

import { ClientEntity as Entity } from '@/client/domain/entities';
import { GetAllUseCase as UseCase } from '@/client/application/use_cases';
import { ImplementationMongoose } from '@/client/infrastructure/implementation/mongoose';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const entities : Entity[] | null = await useCase.run()

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Registro Recuperados Correctamente',
            data: entities

        })

    } catch (error) {
        next(error)
    }
}

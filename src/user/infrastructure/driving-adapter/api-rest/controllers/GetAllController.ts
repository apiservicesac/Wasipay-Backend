import { NextFunction, Request, Response } from 'express'

import { UserEntity as Entity } from '@/user/domain/entities';
import { GetAllUseCase as UseCase } from '@/user/application/use_cases';
import { ImplementationMongoose } from '@/user/infrastructure/implementation/mongoose';

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

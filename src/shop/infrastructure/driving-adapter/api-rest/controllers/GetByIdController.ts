import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { GetByIdUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationMongoose } from '@/shop/infrastructure/implementation/mongoose';

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

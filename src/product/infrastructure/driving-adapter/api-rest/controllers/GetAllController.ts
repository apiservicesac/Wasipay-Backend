import { NextFunction, Request, Response } from 'express'

import { ProductEntity as Entity } from '@/product/domain/entities';
import { GetAllUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationMongoose } from '@/product/infrastructure/implementation/mongoose';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shop_id = req.params.shop_id;

        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const entities : Entity[] | null = await useCase.run(shop_id)

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

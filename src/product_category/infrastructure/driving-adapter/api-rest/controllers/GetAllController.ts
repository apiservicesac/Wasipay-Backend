import { NextFunction, Request, Response } from 'express'

import { ProductCategoryEntity as Entity } from '@/product_category/domain/entities';
import { GetAllUseCase as UseCase } from '@/product_category/application/use_cases';
import { ImplementationMongoose } from '@/product_category/infrastructure/implementation/mongoose';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shopId = req.params.shop_id;

        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const entities : Entity[] | null = await useCase.run(shopId)

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

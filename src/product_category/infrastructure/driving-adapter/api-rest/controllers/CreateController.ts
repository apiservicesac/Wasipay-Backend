import { NextFunction, Request, Response } from 'express'

import { ProductCategoryEntity as Entity } from '@/product_category/domain/entities';
import { CreateUseCase as UseCase } from '@/product_category/application/use_cases';
import { ImplementationMongoose } from '@/product_category/infrastructure/implementation/mongoose';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shopId = req.params.shop_id;

        const body_data = req.body;

        const data : Entity = {
            ...body_data,
            shop: shopId,
        }
        
        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const dataCreated = await useCase.run(data)

        res.status(201).json({
            status: 'created',
            code: 201,
            message: 'Registro Creado Correctamente',
            data: dataCreated
        })

    } catch (error) {
        next(error)
    }
}

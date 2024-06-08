import { NextFunction, Request, Response } from 'express'

import { ProductEntity as Entity } from '@/product/domain/entities';
import { CreateUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationMongoose } from '@/product/infrastructure/implementation/mongoose';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shop_id = req.params.shop_id;

        const body_data = req.body;

        const data : Entity = {
            ...body_data,
            shop_id: shop_id,
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

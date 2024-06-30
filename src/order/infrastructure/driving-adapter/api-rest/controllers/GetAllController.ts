import { NextFunction, Request, Response } from 'express'

import { OrderEntity as Entity } from '@/order/domain/entities';
import { GetAllUseCase as UseCase } from '@/order/application/use_cases/order';
import { OrderImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';


export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shop_id = req.params.shop_id;

        const mongooseRepository = new OrderImplementationMongoose()
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

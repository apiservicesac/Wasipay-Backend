import { NextFunction, Request, Response } from 'express'

import { GetNextCodeUseCase as UseCase } from '@/order/application/use_cases/order';
import { OrderImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';

export const getNextCodeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shop_id = req.params.shop_id;

        const mongooseRepository = new OrderImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const entity : string = await useCase.run(shop_id)

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Codigo Recuperado Correctamente',
            data: entity

        })

    } catch (error) {
        next(error)
    }
}

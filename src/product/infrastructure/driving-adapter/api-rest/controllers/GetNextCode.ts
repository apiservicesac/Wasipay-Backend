import { NextFunction, Request, Response } from 'express'

import { GetNextCodeUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationMongoose } from '@/product/infrastructure/implementation/mongoose';

export const getNextCodeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shop_id = req.params.shop_id;

        const mongooseRepository = new ImplementationMongoose()
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

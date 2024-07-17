import { NextFunction, Request, Response } from 'express'

import { DeleteUseCase as UseCase } from '@/payment_method_shop/application/use_cases';
import { ImplementationMongoose } from '@/payment_method_shop/infrastructure/implementation/mongoose';

export const deleteController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { id, shop_id } = req.params;

        const sequelizeRepository = new ImplementationMongoose()
        const useCase = new UseCase(sequelizeRepository)
        
        await useCase.run(shop_id, id)

        res.status(200).json({
            status: 'deleted',
            code: 200,
            message: 'Registro Eliminado Correctamente',
            data: null
        })

    } catch (error) {
        next(error)
    }
}

import { NextFunction, Request, Response } from 'express'

import { PaymentMethodEntity as Entity } from '@/payment_method/domain/entities';
import { GetAllUseCase as UseCase } from '@/payment_method/application/use_cases';
import { ImplementationMongoose } from '@/payment_method/infrastructure/implementation/mongoose';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const sequelizeRepository = new ImplementationMongoose()
        const useCase = new UseCase(sequelizeRepository)
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

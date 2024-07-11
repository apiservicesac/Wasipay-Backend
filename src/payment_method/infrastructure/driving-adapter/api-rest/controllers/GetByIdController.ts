import { NextFunction, Request, Response } from 'express'

import { PaymentMethodEntity as Entity } from '@/payment_method/domain/entities';
import { GetByIdUseCase as UseCase } from '@/payment_method/application/use_cases';
import { ImplementationMongoose } from '@/payment_method/infrastructure/implementation/mongoose';

export const getByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const sequelizeRepository = new ImplementationMongoose()
        const useCase = new UseCase(sequelizeRepository)
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

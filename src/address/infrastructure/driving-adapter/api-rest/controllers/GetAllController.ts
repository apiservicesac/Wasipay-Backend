import { NextFunction, Request, Response } from 'express'

import { AddressEntity as Entity } from '@/address/domain/entities';
import { GetAllUseCase as UseCase } from '@/address/application/use_cases';
import { ImplementationMongoose } from '@/address/infrastructure/implementation/mongoose';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const customerId = req.params.customer_id;

        const sequelizeRepository = new ImplementationMongoose()
        const useCase = new UseCase(sequelizeRepository)
        const entities : Entity[] | null = await useCase.run(customerId)

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

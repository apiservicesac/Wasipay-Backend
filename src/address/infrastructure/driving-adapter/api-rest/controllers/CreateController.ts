import { NextFunction, Request, Response } from 'express'

import { AddressEntity as Entity } from '@/address/domain/entities';
import { CreateUseCase as UseCase } from '@/address/application/use_cases';
import { ImplementationMongoose } from '@/address/infrastructure/implementation/mongoose';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {        

        const customerId = req.params.customer_id
        const body_data : Entity = req.body;
        body_data.customer_id = customerId
        
        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const dataCreated = await useCase.run(body_data)
        
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

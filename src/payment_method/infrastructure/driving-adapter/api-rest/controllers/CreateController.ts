import { NextFunction, Request, Response } from 'express'

import { PaymentMethodEntity as Entity } from '@/payment_method/domain/entities';
import { CreateUseCase as UseCase } from '@/payment_method/application/use_cases';
import { ImplementationMongoose } from '@/payment_method/infrastructure/implementation/mongoose';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {        

        const body_data : Entity = req.body;
                
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

import { NextFunction, Request, Response } from 'express'

import { ClientEntity as Entity } from '@/client/domain/entities';
import { CreateUseCase as UseCase } from '@/client/application/use_cases';
import { ImplementationMongoose } from '@/client/infrastructure/implementation/mongoose';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { name, last_name, vat, business_name, address, coordinates } = req.body;

        const data : Entity = {
            name,
            last_name,
            vat,
            business_name,            
            address,
            coordinates,
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

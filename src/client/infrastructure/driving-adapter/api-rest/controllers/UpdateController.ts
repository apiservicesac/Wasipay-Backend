import { NextFunction, Request, Response } from 'express'

import { ClientEntity as Entity } from '@/client/domain/entities';
import { UpdateUseCase as UseCase } from '@/client/application/use_cases';
import { ImplementationMongoose } from '@/client/infrastructure/implementation/mongoose';

export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;
        
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
        const datUpdated = await useCase.run(entityId, data)

        res.status(200).json({
            status: 'updated',
            code: 200,
            message: 'Registro Actualizado Correctamente',
            data: datUpdated
        })

    } catch (error) {
        next(error)
    }
}

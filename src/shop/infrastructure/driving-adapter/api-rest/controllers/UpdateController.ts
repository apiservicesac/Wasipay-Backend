import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { UpdateUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationMongoose } from '@/shop/infrastructure/implementation/mongoose';

export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;
        
        const body_data = req.body;


        const data : Entity = {
            ...body_data
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

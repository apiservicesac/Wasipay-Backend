import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { UpdateUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationSequelize } from '@/shop/infrastructure/implementation/sequelize';

export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;
        
        const {  name, description, social_media } = req.body;


        const data : Entity = {
            name,
            description, 
            social_media
        }
        
        const repository = new ImplementationSequelize()
        const useCase = new UseCase(repository)
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

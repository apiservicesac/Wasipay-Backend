import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { CreateUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationSequelize } from '@/shop/infrastructure/implementation/sequelize';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { name, description, social_media } = req.body;

        const data : Entity = {
            name, 
            description, 
            social_media
        }
        
        const repository = new ImplementationSequelize()
        const useCase = new UseCase(repository)
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

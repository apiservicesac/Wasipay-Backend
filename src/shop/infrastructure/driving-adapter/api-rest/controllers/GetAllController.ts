import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { GetAllUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationSequelize } from '@/shop/infrastructure/implementacion/sequelize';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
        const entities : Entity[] | null = await useCase.run()

        res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Registro Recuperados Correctamente',
            data: entities

        })

    } catch (error) {
        next(error)
    }
}

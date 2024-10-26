import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { GetAllUseCase as UseCase } from '@/shop/application/use_cases';
import { mongooseRepository } from '@/shop/infrastructure/implementation/mongoose';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const useCase = new UseCase(mongooseRepository)
        const entities : Entity[] = await useCase.run()

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

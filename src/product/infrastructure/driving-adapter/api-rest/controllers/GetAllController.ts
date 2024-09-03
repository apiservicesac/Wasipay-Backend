import { NextFunction, Request, Response } from 'express'

import { ProductEntity as Entity } from '@/product/domain/entities';
import { GetAllUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationSequelize } from '@/product/infrastructure/implementation/sequelize';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const repository = new ImplementationSequelize()
        const useCase = new UseCase(repository)
        const entities : Entity[] | null = await useCase.run()

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
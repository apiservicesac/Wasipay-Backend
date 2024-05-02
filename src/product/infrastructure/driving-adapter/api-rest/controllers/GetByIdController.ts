import { NextFunction, Request, Response } from 'express'

import { ProductEntity as Entity } from '@/product/domain/entities';
import { GetByIdUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationSequelize } from '@/product/infrastructure/implementacion/sequelize';

export const getByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
        const entity : Entity | null = await useCase.run(entityId)

        res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Registro Recuperado Correctamente',
            data: entity

        })

    } catch (error) {
        next(error)
    }
}

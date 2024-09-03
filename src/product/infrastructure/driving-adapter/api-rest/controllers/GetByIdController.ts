import { NextFunction, Request, Response } from 'express'

import { ProductEntity as Entity } from '@/product/domain/entities';
import { GetByIdUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationSequelize } from '@/product/infrastructure/implementation/sequelize';

export const getByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const repository = new ImplementationSequelize()
        const useCase = new UseCase(repository)
        const entity : Entity | null = await useCase.run(entityId)

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Registro Recuperado Correctamente',
            data: entity

        })

    } catch (error) {
        next(error)
    }
}

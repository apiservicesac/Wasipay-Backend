import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { UpdateFieldUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationSequelize } from '@/shop/infrastructure/implementacion/sequelize';

export const updateFieldController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;

        const { field, value } = req.body;
        
        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
        const datUpdated = await useCase.run(entityId, field, value)

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

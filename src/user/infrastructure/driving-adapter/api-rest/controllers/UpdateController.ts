import { NextFunction, Request, Response } from 'express'

import { UserEntity as Entity } from '@/user/domain/entities';
import { UpdateUseCase as UseCase } from '@/user/application/use_cases';
import { ImplementationSequelize } from '@/user/infrastructure/implementation/sequelize';

export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;
        
        const body_data = req.body;


        const data : Entity = new Entity({...body_data})
        
        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
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

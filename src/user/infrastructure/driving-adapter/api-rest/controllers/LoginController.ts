import { NextFunction, Request, Response } from 'express'

import { UserEntity as Entity } from '@/user/domain/entities';
import { LoginUseCase as UseCase } from '@/user/application/use_cases';
import { ImplementationSequelize } from '@/user/infrastructure/implementation/sequelize';
import { TokenManager } from '@/shared/utils/TokenManager';

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { email, password } = req.body;

        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
        
        const response_data = await useCase.run(email, password)        

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Authenticacion Existosa.',
            data: response_data
        })

    } catch (error) {
        next(error)
    }
}

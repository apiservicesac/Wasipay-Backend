import { NextFunction, Request, Response } from 'express'

import { LoginUseCase as UseCase } from '@/user/application/use_cases';
import { ImplementationMongoose } from '@/user/infrastructure/implementation/mongoose';

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { email, password } = req.body;

        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        
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

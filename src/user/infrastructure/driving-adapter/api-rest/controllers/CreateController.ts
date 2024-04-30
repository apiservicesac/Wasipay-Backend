import { NextFunction, Request, Response } from "express"
import { UserEntity as Entity } from '@/user/domain/entities';
import { CreateUseCase as UseCase } from '@/user/application/use_cases';
import { ImplementationSequelize } from '@/user/infrastructure/implementation/sequelize';

export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {
            email, 
            password,
            user_type
        } = req.body

        const data : Entity = {
            email: email,
            password: password,
            user_type: user_type
        }
        

        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
        const dataCreated = await useCase.run(data)

        res.status(201).json({
            status : "success",
            code : 201,
            message : "Usuario creado exitosamente",
            data : {
              user : dataCreated
            }
          })

    } catch (error) {
        next(error)
    }
}

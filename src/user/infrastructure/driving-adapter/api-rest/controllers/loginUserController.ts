import { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"

import { User } from "../../../../domain/entities"
import { PostgresDBUserRepository } from "../../../implementation/sequelize"
import { UserLoginUseCase } from "../../../../application/use_cases"


export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const postgresDBUserRepository = new PostgresDBUserRepository()
    
        const userLoginUseCase = new UserLoginUseCase(postgresDBUserRepository)
    
        const userLogin: User = {
            email: req.body.email,
            password: req.body.password
        }

        const { user, accessToken, refreshToken } = await userLoginUseCase.run(userLogin)

        res.status(200).json({
            status: "success",
            code: 200,
            message: "Inicio de sesión exitoso",
            data: {
                user: user as User,
                access_token : accessToken,
                refresh_token: refreshToken
            }
        })

    } catch (error) {
        next(error)
    }
}

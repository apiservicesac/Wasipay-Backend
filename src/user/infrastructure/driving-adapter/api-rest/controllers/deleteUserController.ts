import { NextFunction, Request, Response } from "express"
import { UserDeleteUseCase } from "../../../../application/use_cases"
import { PostgresDBUserRepository } from "../../../implementation/sequelize"

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const {
            email
        } = req.body

        const postgresDBUserRepository = new PostgresDBUserRepository()

        const userDeleteUseCase = new UserDeleteUseCase(postgresDBUserRepository)

        await userDeleteUseCase.run(email)

        res.status(200).json({
            status : "success",
            code : 200,
            message : "Usuario eliminado existosamente",
            data : null
          })

    } catch (error) {
        next(error)
    }
}

import { NextFunction, Request, Response } from "express"

import { UserGetAllUseCase } from "../../../../application/use_cases"
import { User } from "../../../../domain/entities"
import { PostgresDBUserRepository } from "../../../implementation/sequelize"

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const postgresDBUserRepository = new PostgresDBUserRepository()
        const userGetAllUseCase = new UserGetAllUseCase(postgresDBUserRepository)

        const allUsersFromDatabase: User[] = await userGetAllUseCase.run()

        const allUsers: User[] = allUsersFromDatabase.map((user: User) => {
            const { password, ...userMapped } = user
            return userMapped as User
        })

        res.status(200).json({
            status: "success",
            code: 200,
            message: "Usuarios recuperados exitosamente",
            data: {
                users: allUsers
            }
        })

    } catch (error) {
        next(error)
    }
}

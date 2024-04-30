import { NextFunction, Request, Response } from "express"
import { PostgresDBUserRepository } from "../../../implementation/sequelize"
import { UserUpdateDetailUseCase } from "../../../../application/use_cases"
import { User } from "../../../../domain/entities"

export const updateUserDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const detail = req.body;
        
        const email = detail.email; 
        const user = detail; 
        console.log(user);

        if (email === undefined || user === undefined) {
            // Manejar el caso en el que faltan datos necesarios
            res.status(400).json({
                status: "error",
                code: 400,
                message: "Faltan datos necesarios para la actualización.",
            });
            return;
        }

        const postgresDBUserRepository = new PostgresDBUserRepository();
        const userUpdateDetailUseCase = new UserUpdateDetailUseCase(postgresDBUserRepository);

        const { userUpdated } = await userUpdateDetailUseCase.run(user, email);

        if (userUpdated === null) {
            // Manejar el caso en el que la actualización no fue exitosa
            res.status(404).json({
                status: "error",
                code: 404,
                message: "Usuario no encontrado o no actualizado.",
            });
            return;
        }

        const { ...userMapped } = userUpdated;

        res.status(200).json({
            status: "success",
            code: 200,
            message: "Usuario actualizado exitosamente",
            data: {
                user: userMapped as User,
            },
        });
    } catch (error) {
        next(error);
    }
};


import { SaveUseCase as UseCase } from "@/file_uploader/application/use_case";
import { ImplementationSequelize } from "@/file_uploader/infrastructure/implementation/sequelize";
import e, { NextFunction, Request, Response } from "express"

export const saveController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = req?.files?.images;

        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
        const dataCreated = await useCase.run(images)

        res.status(201).json({
            status: 'created',
            code: 201,
            message: 'Registro Creado Correctamente',
            data: dataCreated
        })

    } catch (error) {
        next(error)
    }
}

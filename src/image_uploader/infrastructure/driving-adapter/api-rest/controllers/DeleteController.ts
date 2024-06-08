import { DeleteUseCase as UseCase } from "@/image_uploader/application/use_case";
import { ImplementationMongoose } from "@/image_uploader/infrastructure/implementation/mongoose";
import { NextFunction, Request, Response } from "express"

export const deleteController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { ids } = req?.body

        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const dataCreated = await useCase.run(ids)

        res.status(201).json({
            status: 'created',
            code: 201,
            message: 'Registros Eliminados Correctamente',
            data: dataCreated
        })

    } catch (error) {
        next(error)
    }
}

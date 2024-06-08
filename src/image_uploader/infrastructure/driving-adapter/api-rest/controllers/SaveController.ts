import { SaveUseCase as UseCase } from "@/image_uploader/application/use_case";
import { ImplementationMongoose } from "@/image_uploader/infrastructure/implementation/mongoose";
import { NextFunction, Request, Response } from "express"

export const saveController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = req?.files?.images;
        
        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const dataCreated = await useCase.run(images)

        res.status(201).json({
            status: 'created',
            code: 201,
            message: 'Registro Creado Correctamente',
            data: dataCreated
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

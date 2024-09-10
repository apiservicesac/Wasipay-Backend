import { NextFunction, Request, Response } from 'express';
import { GetAllUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationSequelize } from '@/product/infrastructure/implementation/sequelize';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { shop_id } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = 20;

        const repository = new ImplementationSequelize();
        const useCase = new UseCase(repository);
        const result = await useCase.run(shop_id, page, pageSize);

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Registros recuperados correctamente',
            data: {
                products: result?.data,
                total: result?.total,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(result?.total! / pageSize)
            },            
        });

    } catch (error) {
        next(error);
    }
};

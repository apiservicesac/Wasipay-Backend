import { NextFunction, Request, Response } from 'express'

import { OrderEntity as Entity } from '@/order/domain/entities';
import { CreateUseCase as UseCase } from '@/order/application/use_cases/order';
import { OrderImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';
import { OrderLineImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';


export const createController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shop_id = req.params.shop_id;

        const body_data = req.body;

        const data : Entity = {
            ...body_data,
            shop_id: shop_id,
        }
        
        const orderRepository = new OrderImplementationMongoose()
        const orderLineRepository = new OrderLineImplementationMongoose()
        const useCase = new UseCase(orderRepository, orderLineRepository)
        const dataCreated = await useCase.run(data)

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

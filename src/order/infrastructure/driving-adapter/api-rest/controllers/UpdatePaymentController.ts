import { NextFunction, Request, Response } from 'express'

import { UpdateFieldUseCase  as UpdateFieldUseCaseOrderPayment } from '@/order/application/use_cases/order_payment';
import { UpdateFieldUseCase  as UpdateFieldUseCaseOrder } from '@/order/application/use_cases/order';
import { OrderImplementationMongoose, OrderPaymentImplementationMongoose } from '@/order/infrastructure/implementation/mongoose';
import { SaveImageUseCase } from '@/image_uploader/application/use_case';
import { ImplementationMongoose as ImplementationImageUploader } from '@/image_uploader/infrastructure/implementation/mongoose';
import { CreateEntityException } from '@/shared/exceptions';
import { OrderStatus } from '@/order/domain/enums';


export const updatePaymentController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const images = req?.files?.images;
        const { shop_id, order_id } = req.body;
        const order_payment_id = req.params.order_payment_id;        
        
        const mongooseImageUploaderRepository = new ImplementationImageUploader()
        const saveImageUseCase = new SaveImageUseCase(mongooseImageUploaderRepository)
        const images_entities = await saveImageUseCase.run(shop_id, 'order_payments', null, images)    
        if(images_entities.length === 0) throw new CreateEntityException()

        const orderPaymentRepository = new OrderPaymentImplementationMongoose()
        const useOrderPaymentCase = new UpdateFieldUseCaseOrderPayment(orderPaymentRepository)
        await useOrderPaymentCase.run(order_payment_id, "image", images_entities[0]._id!)

        const orderRepository = new OrderImplementationMongoose()
        const useOrderCase = new UpdateFieldUseCaseOrder(orderRepository)
        const data = await useOrderCase.run(order_id, "status", OrderStatus.NEW)

        res.status(200).json({
            status: 'updated',
            code: 200,
            message: 'Registro Actualizado Correctamente',
            data: data
        })

    } catch (error) {
        next(error)
    }
}

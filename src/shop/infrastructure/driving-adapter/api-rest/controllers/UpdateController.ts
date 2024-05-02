import { NextFunction, Request, Response } from 'express'

import { ShopEntity as Entity } from '@/shop/domain/entities';
import { UpdateUseCase as UseCase } from '@/shop/application/use_cases';
import { ImplementationSequelize } from '@/shop/infrastructure/implementacion/sequelize';

export const updateController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const entityId = req.params.id;
        
        const { name, description, address, city, country, postal_code, email, phone, social_media, opening_hours } = req.body;


        const data : Entity = {
            id: entityId,
            name,
            description,
            address,
            city,
            country,
            postal_code,
            email,
            phone,
            social_media,
            opening_hours
        }
        
        const sequelizeRepository = new ImplementationSequelize()
        const useCase = new UseCase(sequelizeRepository)
        const datUpdated = await useCase.run(data)

        res.status(200).json({
            status: 'updated',
            code: 200,
            message: 'Registro Actualizado Correctamente',
            data: datUpdated
        })

    } catch (error) {
        next(error)
    }
}

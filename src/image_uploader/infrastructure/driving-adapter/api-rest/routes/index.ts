import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '@/shared/utils/Logger'

import { ROUTES_IMAGE_SERVICE } from '@/core/routes/v1/const.routes'
import routes from './routes'
import { ImageUploadException, ImageValidatorException } from '@/image_uploader/domain/exceptions'
import { CreateEntityException } from '@/shared/exceptions'
const route = Router()

route.use(ROUTES_IMAGE_SERVICE.IMAGE_SERVICE, routes)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err + '\n')
    if(err instanceof ImageUploadException) {
        res.status(422).json({
            status: "error",
            code: 422,
            message: err.message,
            data: null
        })
    }
    else if(err instanceof ImageValidatorException) {
        res.status(422).json({
            status: "error",
            code: 422,
            message: err.message,
            data: null
        })
    }
    else if(err instanceof CreateEntityException) {
        res.status(422).json({
            status: "error",
            code: 422,
            message: err.message,
            data: null
        })
    }
    else {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Error del servidor',
            data: null
        })
    }    
})

export default route
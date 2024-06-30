import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '@/shared/utils/Logger'

import { ROUTES_ORDER } from '@/core/routes/v1/const.routes'
import routes from './routes'
import { CreateEntityException, DeleteEntityException, UpdateEntityException } from '@/shared/exceptions'
const route = Router()

route.use(ROUTES_ORDER.ORDER, routes)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err + '\n')
    if (err instanceof CreateEntityException) {
        res.status(422).json({
            status: "error",
            code: 422,
            message: err.message,
            data: null
        })
    }
    else if (err instanceof DeleteEntityException) {
        res.status(422).json({
            status: "error",
            code: 422,
            message: err.message,
            data: null
        })
    }
    else if (err instanceof UpdateEntityException) {
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
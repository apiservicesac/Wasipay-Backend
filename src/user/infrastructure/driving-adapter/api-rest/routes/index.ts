import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '@/shared/utils/Logger'

import { ROUTES_USER } from '@/core/routes/v1/const.routes'
import routes from './routes'
import { AuthenticateException } from '@/shared/exceptions'
const route = Router()

route.use(ROUTES_USER.USER, routes)


route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err + '\n')
    if (err instanceof AuthenticateException) {
        res.status(401).json({
            status: "error",
            code: 401,
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
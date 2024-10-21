import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '@/shared/utils/Logger'

import { ROUTES_SHOP } from '@/core/routes/v1/const.routes'
import routes from './routes'
const route = Router()

route.use(ROUTES_SHOP.SHOP, routes)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err + '\n')
    res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Error del servidor',
        data: null
    })
})

export default route
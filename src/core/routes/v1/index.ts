import { Router } from 'express'
import { ROUTE_VERSION } from './const.routes'
import { LoggerMiddleware } from '@/shared/middleware/LoggerMiddleware'
import ShopRoutes from '@/shop/infrastructure/driving-adapter/api-rest/routes'
const loggerMiddleware = new LoggerMiddleware()
const route = Router() 

route.use(ROUTE_VERSION, loggerMiddleware.logRequestInfo, ShopRoutes)

export default route

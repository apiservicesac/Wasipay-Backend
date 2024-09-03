import { Router } from 'express'
import { ROUTE_VERSION } from './const.routes'
import { LoggerMiddleware } from '@/shared/middleware/LoggerMiddleware'
import ProductRoutes from '@/product/infrastructure/driving-adapter/api-rest/routes'
// import UserRoutes from '@/user/infrastructure/driving-adapter/api-rest/routes'
const loggerMiddleware = new LoggerMiddleware()
const route = Router() 

route.use(ROUTE_VERSION, loggerMiddleware.logRequestInfo, ProductRoutes)
// route.use(ROUTE_VERSION, loggerMiddleware.logRequestInfo, UserRoutes)

export default route

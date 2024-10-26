import { Router } from 'express'

import { ROUTES_SHOP } from '@/core/routes/v1/const.routes'
import routes from './routes'
const route = Router()

route.use(ROUTES_SHOP.SHOP, routes)

export default route
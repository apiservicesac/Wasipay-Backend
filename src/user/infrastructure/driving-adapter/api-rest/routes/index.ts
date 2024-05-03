import { Router } from 'express'
import { ROUTES_USER } from '@/core/routes/v1/const.routes'
import routes from './routes'
const route = Router()

route.use(ROUTES_USER.USER, routes)

export default route
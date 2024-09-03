import { Router } from 'express'
import { getAllController, getByIdController } from '../controllers'
import { ROUTES_PRODUCT } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.get(ROUTES_PRODUCT.PRODUCT_GET_ALL, getAllController)
route.get(ROUTES_PRODUCT.PRODUCT_GET_BY_ID, getByIdController)

export default route
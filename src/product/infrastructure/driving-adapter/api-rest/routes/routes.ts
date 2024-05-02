import { Router } from 'express'
import { createController, deleteController, getAllController, getByIdController, updateController, updateFieldController } from '../controllers'
import { ROUTES_PRODUCT } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.post(ROUTES_PRODUCT.PRODUCT_CREATE, createController)
route.delete(ROUTES_PRODUCT.PRODUCT_DELETE, deleteController)
route.get(ROUTES_PRODUCT.PRODUCT_GET_ALL, getAllController)
route.get(ROUTES_PRODUCT.PRODUCT_GET_BY_ID, getByIdController)
route.put(ROUTES_PRODUCT.PRODUCT_UPDATE, updateController)
route.patch(ROUTES_PRODUCT.PRODUCT_UPDATE_FIELD, updateFieldController)


export default route
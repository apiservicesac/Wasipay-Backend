import { Router } from 'express'
import { ROUTES_PAYMENT_METHOD_SHOP } from '@/core/routes/v1/const.routes'
import { createController, deleteController, updateController, updateFieldController } from '../controllers'
 
const route = Router()

route.post(ROUTES_PAYMENT_METHOD_SHOP.PAYMENT_METHOD_SHOP_CREATE, createController)
route.delete(ROUTES_PAYMENT_METHOD_SHOP.PAYMENT_METHOD_SHOP_DELETE, deleteController)
route.put(ROUTES_PAYMENT_METHOD_SHOP.PAYMENT_METHOD_SHOP_UPDATE, updateController)
route.patch(ROUTES_PAYMENT_METHOD_SHOP.PAYMENT_METHOD_SHOP_UPDATE_FIELD, updateFieldController)


export default route
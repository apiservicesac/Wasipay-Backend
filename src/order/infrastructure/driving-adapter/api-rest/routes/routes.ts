import { Router } from 'express'
import { createController, deleteController, getAllController, getByIdController, getNextCodeController, updateController, updateFieldController, updatePaymentController } from '../controllers'
import { ROUTES_ORDER } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.get(ROUTES_ORDER.ORDER_GET_ALL, getAllController)
route.get(ROUTES_ORDER.ORDER_GET_BY_ID, getByIdController)
route.get(ROUTES_ORDER.ORDER_GET_NEXT_CODE, getNextCodeController)

route.post(ROUTES_ORDER.ORDER_CREATE, createController)
route.put(ROUTES_ORDER.ORDER_UPDATE, updateController)
route.patch(ROUTES_ORDER.ORDER_UPDATE_PAYMENT, updatePaymentController)
route.patch(ROUTES_ORDER.ORDER_UPDATE_FIELD, updateFieldController)

route.delete(ROUTES_ORDER.ORDER_DELETE, deleteController)

export default route
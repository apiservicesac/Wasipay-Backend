import { Router } from 'express'
import { ROUTES_PAYMENT_METHOD } from '@/core/routes/v1/const.routes'
import { createController, deleteController, getAllController, getByIdController, updateController, updateFieldController } from '../controllers'
 
const route = Router()

route.post(ROUTES_PAYMENT_METHOD.PAYMENT_METHOD_CREATE, createController)
route.delete(ROUTES_PAYMENT_METHOD.PAYMENT_METHOD_DELETE, deleteController)
route.get(ROUTES_PAYMENT_METHOD.PAYMENT_METHOD_GET_ALL, getAllController)
route.get(ROUTES_PAYMENT_METHOD.PAYMENT_METHOD_GET_BY_ID, getByIdController)
route.put(ROUTES_PAYMENT_METHOD.PAYMENT_METHOD_UPDATE, updateController)
route.patch(ROUTES_PAYMENT_METHOD.PAYMENT_METHOD_UPDATE_FIELD, updateFieldController)


export default route
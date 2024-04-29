import { Router } from 'express'
import { createController, deleteController, getAllController, getByIdController, updateController, updateFieldController } from '../controllers'
import { ROUTES_SHOP } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.post(ROUTES_SHOP.SHOP_CREATE, createController)
route.delete(ROUTES_SHOP.SHOP_DELETE, deleteController)
route.get(ROUTES_SHOP.SHOP_GET_ALL, getAllController)
route.get(ROUTES_SHOP.SHOP_GET_BY_ID, getByIdController)
route.put(ROUTES_SHOP.SHOP_UPDATE, updateController)
route.patch(ROUTES_SHOP.SHOP_UPDATE_FIELD, updateFieldController)


export default route
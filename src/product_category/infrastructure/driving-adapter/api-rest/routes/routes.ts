import { Router } from 'express'
import { createController, deleteController, getAllController, getByIdController, updateController, updateFieldController } from '../controllers'
import { ROUTES_PRODUCT_CATEGORY } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.post(ROUTES_PRODUCT_CATEGORY.PRODUCT_CATEGORY_CREATE, createController)
route.delete(ROUTES_PRODUCT_CATEGORY.PRODUCT_CATEGORY_DELETE, deleteController)
route.get(ROUTES_PRODUCT_CATEGORY.PRODUCT_CATEGORY_GET_ALL, getAllController)
route.get(ROUTES_PRODUCT_CATEGORY.PRODUCT_CATEGORY_GET_BY_ID, getByIdController)
route.put(ROUTES_PRODUCT_CATEGORY.PRODUCT_CATEGORY_UPDATE, updateController)
route.patch(ROUTES_PRODUCT_CATEGORY.PRODUCT_CATEGORY_UPDATE_FIELD, updateFieldController)


export default route
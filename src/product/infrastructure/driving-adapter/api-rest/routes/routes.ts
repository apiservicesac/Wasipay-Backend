import { Router } from 'express'
import { createController, deleteController, getAllController, getByIdController, getNextCodeController, updateController, updateFieldController, updateImagesController } from '../controllers'
import { ROUTES_PRODUCT } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.get(ROUTES_PRODUCT.PRODUCT_GET_ALL, getAllController)
route.get(ROUTES_PRODUCT.PRODUCT_GET_BY_ID, getByIdController)
route.get(ROUTES_PRODUCT.PRODUCT_GET_NEXT_CODE, getNextCodeController)

route.post(ROUTES_PRODUCT.PRODUCT_CREATE, createController)
route.put(ROUTES_PRODUCT.PRODUCT_UPDATE, updateController)
route.post(ROUTES_PRODUCT.PRODUCT_UPDATE_IMAGES, updateImagesController)
route.patch(ROUTES_PRODUCT.PRODUCT_UPDATE_FIELD, updateFieldController)

route.delete(ROUTES_PRODUCT.PRODUCT_DELETE, deleteController)

export default route
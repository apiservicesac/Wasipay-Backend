import { Router } from 'express'
import { ROUTES_ADDRESS } from '@/core/routes/v1/const.routes'
import { createController, deleteController, getAllController, getByIdController, updateController, updateFieldController } from '../controllers'
 
const route = Router()

route.post(ROUTES_ADDRESS.ADDRESS_CREATE, createController)
route.delete(ROUTES_ADDRESS.ADDRESS_DELETE, deleteController)
route.get(ROUTES_ADDRESS.ADDRESS_GET_ALL, getAllController)
route.get(ROUTES_ADDRESS.ADDRESS_GET_BY_ID, getByIdController)
route.put(ROUTES_ADDRESS.ADDRESS_UPDATE, updateController)
route.patch(ROUTES_ADDRESS.ADDRESS_UPDATE_FIELD, updateFieldController)


export default route
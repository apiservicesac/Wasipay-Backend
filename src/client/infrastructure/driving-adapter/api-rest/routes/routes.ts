import { Router } from 'express'
import { createController, deleteController, getAllController, getByIdController, updateController, updateFieldController, updateImageController } from '../controllers'
import { ROUTES_CLIENT } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.get(ROUTES_CLIENT.CLIENT_GET_ALL, getAllController)
route.get(ROUTES_CLIENT.CLIENT_GET_BY_ID, getByIdController)

route.post(ROUTES_CLIENT.CLIENT_CREATE, createController)
route.put(ROUTES_CLIENT.CLIENT_UPDATE, updateController)
route.post(ROUTES_CLIENT.CLIENT_UPDATE_IMAGE, updateImageController)
route.patch(ROUTES_CLIENT.CLIENT_UPDATE_FIELD, updateFieldController)

route.delete(ROUTES_CLIENT.CLIENT_DELETE, deleteController)

export default route
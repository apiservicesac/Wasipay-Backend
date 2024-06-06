import { Router } from 'express'
import { ROUTES_USER } from '@/core/routes/v1/const.routes'
import { loginController, createController } from '../controllers'
 
const route = Router()

route.post(ROUTES_USER.USER_LOGIN, loginController)
route.post(ROUTES_USER.USER_CREATE, createController)
// route.delete(ROUTES_USER.USER_DELETE, deleteController)
// route.get(ROUTES_USER.USER_GET_ALL, getAllController)
// route.get(ROUTES_USER.USER_GET_BY_ID, getByIdController)
// route.put(ROUTES_USER.USER_UPDATE, updateController)
// route.patch(ROUTES_USER.USER_UPDATE_FIELD, updateFieldController)


export default route
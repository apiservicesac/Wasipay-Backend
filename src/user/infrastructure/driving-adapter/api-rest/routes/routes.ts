import { Router } from 'express'
import { ROUTES_USER } from '@/core/routes/v1/const.routes'
import { loginController, createController, deleteController, getAllController, getByIdController, updateController, updateFieldController } from '../controllers'
import { TokenMiddleware } from '@/shared/middleware/TokenMiddleware'
 
const route = Router()
const tokenMiddleware = new TokenMiddleware()

route.post(ROUTES_USER.USER_LOGIN, loginController)
route.post(ROUTES_USER.USER_CREATE, createController)
route.delete(ROUTES_USER.USER_DELETE, tokenMiddleware.checkToken, deleteController)
route.get(ROUTES_USER.USER_GET_ALL, tokenMiddleware.checkToken, getAllController)
route.get(ROUTES_USER.USER_GET_BY_ID, tokenMiddleware.checkToken, getByIdController)
route.put(ROUTES_USER.USER_UPDATE, tokenMiddleware.checkToken, updateController)
route.patch(ROUTES_USER.USER_UPDATE_FIELD, tokenMiddleware.checkToken, updateFieldController)

export default route
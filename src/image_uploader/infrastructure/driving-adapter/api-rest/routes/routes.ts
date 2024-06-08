import { Router } from 'express'
import { saveController, deleteController } from '../controllers'
import { ROUTES_IMAGE_SERVICE } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.post(ROUTES_IMAGE_SERVICE.IMAGE_SAVE, saveController)
route.delete(ROUTES_IMAGE_SERVICE.IMAGE_DELETE, deleteController)

export default route
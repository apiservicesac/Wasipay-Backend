import { Router } from 'express'
import { saveController } from '../controllers'
import { ROUTES_FILE_SERVICE } from '@/core/routes/v1/const.routes'
 
const route = Router()

route.post(ROUTES_FILE_SERVICE.FILE_SAVE, saveController)

export default route
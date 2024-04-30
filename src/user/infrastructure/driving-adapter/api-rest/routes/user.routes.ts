import { Router } from "express"
import { createController } from "../controllers"
import { ROUTES_USER } from "@/core/routes/v1/const.routes"
const route = Router()

route.post(ROUTES_USER.USER_CREATE, createController)

export default route
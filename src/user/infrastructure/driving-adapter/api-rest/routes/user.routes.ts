import { Router } from "express"
import { createUserController, loginUserController, getAllUsersController, resetPasswordUserController, deleteUserController, updateUserDetailController, changePasswordController } from "../controllers"
import { ROUTES_USER } from "../../../../../core/infrastructure/driving-adapter/api-rest/routes/v1/const.routes"
import { AdminMiddleware } from "../../../../../shared/middleware/AdminMiddleware"
import { ValidationLoginUserMiddleware, ValidationRegisterUserMiddleware, ValidationResetPasswordUserMiddleware, ValidationDeleteUserMiddleware, ValidationChangePasswordMiddleware } from "../middleware"
const route = Router()

const authMiddleware = new AdminMiddleware()

route.post(ROUTES_USER.USER_REGISTER, authMiddleware.checkAdmin, ValidationRegisterUserMiddleware.validateData, createUserController)

// route.post(ROUTES_USER.USER_LOGIN, ValidationLoginUserMiddleware.validateData, loginUserController)

// route.get(ROUTES_USER.USER_GET_ALL, authMiddleware.checkAdmin, getAllUsersController)

// route.post(ROUTES_USER.USER_RESET_PASSWORD, ValidationResetPasswordUserMiddleware.validateData, resetPasswordUserController)

// route.delete(ROUTES_USER.USER_DELETE, authMiddleware.checkAdmin, ValidationDeleteUserMiddleware.validateData, deleteUserController)

// route.put(ROUTES_USER.USER_UPDATE, authMiddleware.checkAdmin, updateUserDetailController)

// route.post(ROUTES_USER.USER_CHANGE_PASSWORD, ValidationChangePasswordMiddleware.validateData, changePasswordController)

export default route
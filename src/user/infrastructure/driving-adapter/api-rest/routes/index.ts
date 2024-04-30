import { Request, Response, NextFunction, Router } from "express"
import { UserAlreadyExistsExceptions, UserNotFoundException, InsufficientRoleException, IncorrectPasswordException } from "../../../../domain/exceptions"
import { ROUTES_USER } from "../../../../../core/infrastructure/driving-adapter/api-rest/routes/v1/const.routes"
import routesUser from "./user.routes"
import { logger } from "../../../../../shared/utils/Logger"

const route = Router()

route.use(ROUTES_USER.USER, routesUser)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err + "\n")
    if (err instanceof UserAlreadyExistsExceptions) {
        res.status(422).json({
            status: "error",
            code: 422,
            message: err.message,
            data: null
        })
    }
    else if (err instanceof UserNotFoundException || err instanceof InsufficientRoleException || err instanceof IncorrectPasswordException) {
        res.status(401).json({
            status: "error",
            code: 401,
            message: err.message,
            data: null
        })
    }
    else {
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Error del servidor",
            data: null
        })
    }
})

export default route
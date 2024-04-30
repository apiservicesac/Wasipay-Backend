import { Request, Response, NextFunction, Router } from "express"
import { UserAlreadyExistsExceptions, UserNotFoundException, InsufficientRoleException, IncorrectPasswordException } from "../../../../domain/exceptions"
import routesUser from "./user.routes"
import { logger } from "../../../../../shared/utils/Logger"
import { ROUTES_USER } from "@/core/routes/v1/const.routes"

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
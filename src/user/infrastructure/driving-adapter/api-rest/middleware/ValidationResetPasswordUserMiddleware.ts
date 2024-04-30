import { Request, Response, NextFunction } from 'express'
import { param, validationResult } from 'express-validator'
import { logger } from '../../../../../shared/utils/Logger'

export class ValidationResetPasswordUserMiddleware {
  static validateData = [
    param('email').notEmpty().withMessage('El campo email en la URL es requerido').isEmail().withMessage('El email en la URL no es válido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        logger.error('Errores de validación en el email de reseteo de contraseña:', errors.array())
        return res.status(422).json({
          status : "error",
          code : 422,
          message : "Error de validacion",
          data : {
            errors : errors.array()
          }
        })
      }

      next()
    }
  ]
}

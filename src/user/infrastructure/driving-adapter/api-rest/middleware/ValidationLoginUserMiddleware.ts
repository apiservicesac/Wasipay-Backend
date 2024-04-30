import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { logger } from '../../../../../shared/utils/Logger'

export class ValidationLoginUserMiddleware {
  static validateData = [
    body('email').notEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('El campo contraseña es requerido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        logger.error('Errores de validación:', errors.array())
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

import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { logger } from '../../../../../shared/utils/Logger'

export class ValidationDeleteUserMiddleware {
  static validateData = [
    body('email').notEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El email no es válido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        logger.error('Errores de validación en el email para eliminar usuario:', errors.array())
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

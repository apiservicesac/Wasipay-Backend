import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { logger } from '../../../../../shared/utils/Logger'

export class ValidationChangePasswordMiddleware {
  static validateData = [
    body('email').notEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty(),
    body('new_password').notEmpty().isLength({min: 8}).withMessage('La nueva contraseña no es valida, debe tener como míninmo 8 caracteres'),

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

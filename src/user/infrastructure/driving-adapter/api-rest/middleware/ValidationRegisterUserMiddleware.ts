import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { logger } from '../../../../../shared/utils/Logger'

export class ValidationRegisterUserMiddleware {
  static validateData = [
    body('nombres').notEmpty().withMessage('El campo nombres es requerido'),
    body('apellidos').notEmpty().withMessage('El campo apellidos es requerido'),
    body('telefono').notEmpty().withMessage('El campo teléfono es requerido'),
    body('telefono').isMobilePhone('es-PE').withMessage('El teléfono no es válido'),
    body('email').notEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El email no es válido'),
    body('role')
    .notEmpty()
    .withMessage('El campo role es requerido')
    .custom((value) => {
      if (value !== 'user' && value !== 'admin') {
        throw new Error('El campo role debe ser "user" o "admin"');
      }
      return true;
    }),
    
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

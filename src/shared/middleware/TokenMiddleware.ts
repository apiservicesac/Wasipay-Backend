import { Response, NextFunction } from 'express'
import { TokenManager } from "../utils/TokenManager"

export class TokenMiddleware {

  checkToken(req: any, res: Response, next: NextFunction) {

    const tokenManager = new TokenManager()

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Token expirado o inválido.',
        data: null,
      })
    }

    try {
      const { expired, decoded } = tokenManager.verifyToken(token)

      if (expired || !decoded || decoded.type !== "access") {
          return res.status(401).json({
              status: 'error',
              code: 401,
              message: 'Token expirado o inválido.',
              data: null,
          })
      }       
      next()
      
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Token expirado o inválido.',
        data: null,
    })
    }
  }
}
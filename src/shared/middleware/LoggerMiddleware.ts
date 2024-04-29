import { Request, Response, NextFunction } from 'express'
import { logger } from '@/shared/utils/Logger'

export class LoggerMiddleware {
  logRequestInfo(req: Request, res: Response, next: NextFunction): void {
    const logMessage = `IP: ${req.ip}, Method: ${req.method}, Path: ${req.path}, Protocol: ${req.protocol}, Host: ${req.hostname}, Body: ${JSON.stringify(req.body)}, Query: ${JSON.stringify(req.query)}, Params: ${JSON.stringify(req.params)}, User-Agent: ${req.get('user-agent')} \n`
    logger.info(logMessage)
    next()
  }
}

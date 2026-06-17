import { Request, Response, NextFunction } from 'express'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now()
  const originalSend = res.send

  res.send = function (data: any) {
    const duration = Date.now() - startTime
    const statusCode = res.statusCode
    const method = req.method
    const path = req.path
    const timestamp = new Date().toISOString()

    const logMessage = `[${timestamp}] ${method} ${path} - Status: ${statusCode} - Duration: ${duration}ms`

    if (statusCode >= 400) {
      console.error(logMessage)
    } else {
      console.log(logMessage)
    }

    return originalSend.call(this, data)
  }

  next()
}

import log4js from 'log4js'

log4js.configure({
    'appenders': {
      'file': {
        'type': 'file',
        'filename': 'logs/app.log'
      },
      'console': {
        'type': 'console'
      }
    },
    'categories': {
      'default': {
        'appenders': ['file', 'console'],
        'level': 'debug'
      },
      'Express': {
        'appenders': ['file', 'console'],
        'level': 'debug'
      },
      'Servidor Correos': {
        'appenders': ['console'],
        'level': 'info'
      },
      'Servidor Base datos': {
        'appenders': ['console'],
        'level': 'info'
      },
    }
  }
)


const logger = log4js.getLogger('Express')
const loggerEmail = log4js.getLogger('Servidor Correos')
const loggerDataBase = log4js.getLogger('Servidor Base datos')

export {
  logger,
  loggerEmail,
  loggerDataBase,
  log4js
}


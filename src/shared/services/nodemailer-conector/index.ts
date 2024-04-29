import nodemailer from 'nodemailer'
import { loggerEmail } from '@/shared/utils/Logger'

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'lidermapsperu@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'ccqq nowk xskt apde',
  },
})

loggerEmail.warn('Estableciendo conexión...')

transporter
  .verify()
  .then(() => {
    loggerEmail.info('Conexion establecida con el Servidor de Correos\n')
  })
  .catch((error) => loggerEmail.error('Error al conectarse con el Servidor de Correos\n'))

export { transporter }

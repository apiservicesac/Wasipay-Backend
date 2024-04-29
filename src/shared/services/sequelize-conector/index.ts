import { Sequelize, Options } from 'sequelize'
import { loggerDataBase } from '@/shared/utils/Logger'
import dotenv from 'dotenv'
dotenv.config()

const {
  DB_NAME = 'Azorty',
  DB_USER_NAME = 'postgres',
  DB_PASSWORD = 'postgres',
  DB_HOST = '192.168.18.76',
  DB_PORT = '5440'
} = process.env

const sequelizeOptions: Options = {
  host: DB_HOST,
  dialect: 'postgres',
  port: parseInt(DB_PORT),
  logging: (sql: string) => {
    loggerDataBase.warn(sql + '\n')
  },
}

const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, sequelizeOptions)

loggerDataBase.warn('Estableciendo conexión...')

sequelize
  .authenticate()
  .then(async () => {
    loggerDataBase.warn(`Conectando ${DB_HOST}:${DB_PORT}`)
    loggerDataBase.info('Conexión establecida con la base de datos\n')
  })
  .catch((error) => {
    loggerDataBase.error('Error al conectarse con la base de datos\n', error)
  })

export { sequelize }
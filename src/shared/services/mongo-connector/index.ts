import mongoose from 'mongoose';
import { loggerDataBase } from '@/shared/utils/Logger';
import dotenv from 'dotenv';
dotenv.config();

const {
  DB_NAME = 'test',
  DB_USER_NAME = 'user',
  DB_PASSWORD = 'password',
  DB_HOST = 'localhost',
  DB_PORT = '27017'
} = process.env;

const uri = `mongodb://${DB_HOST}:${DB_PORT}`;

mongoose.connect(uri, { user: DB_USER_NAME, pass: DB_PASSWORD, dbName: DB_NAME })
  .then(() => {
    loggerDataBase.info('Conexión establecida con la base de datos MongoDB\n');
  })
  .catch((error) => {
    loggerDataBase.info(uri)

    loggerDataBase.error('Error al conectarse con la base de datos MongoDB\n', error);
  });

export {
    mongoose
};

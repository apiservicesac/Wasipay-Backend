import dotenv from "dotenv"
import { DataTypes, Model } from "sequelize";
import { sequelize } from '@/shared/services/sequelize-conector/index'
import { loggerDataBase } from "@/shared/utils/Logger";


dotenv.config()

class UserSequelize extends Model {}
  
UserSequelize.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      user_type: {
        type: DataTypes.STRING,
      },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: true,
    }
)


UserSequelize.sync()
  .then(() => {
    loggerDataBase.warn('TABLA USERS => Las tablas se han sincronizado correctamente');
  })
  .catch((error) => {
    loggerDataBase.warn('TABLA USERS => Error al sincronizar las tablas:', error);
  });


export { UserSequelize }
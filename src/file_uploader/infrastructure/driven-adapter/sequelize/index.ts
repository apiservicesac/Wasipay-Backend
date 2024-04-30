import { sequelize } from '@/shared/services/sequelize-conector/index'
import dotenv from 'dotenv'
import { DataTypes, Model } from 'sequelize';
import { loggerDataBase } from '@/shared/utils/Logger';

dotenv.config()

class FileSequelize extends Model {}
  
FileSequelize.init(
    {
        id: {
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },       

    },
    {
        sequelize,
        modelName: 'File',
        tableName: 'file',
        timestamps: true,
    }
)


FileSequelize.sync()
.then(() => {
    loggerDataBase.warn('TABLA FILE API => Las tablas se han sincronizado correctamente');
})
.catch((error) => {
    loggerDataBase.warn('TABLA FILE API => Error al sincronizar las tablas:', error);
});


export { FileSequelize }
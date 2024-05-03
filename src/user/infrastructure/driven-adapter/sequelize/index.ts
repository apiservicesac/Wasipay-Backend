import { sequelize } from '@/shared/services/sequelize-conector/index'
import dotenv from 'dotenv'
import { DataTypes, Model } from 'sequelize';
import { loggerDataBase } from '@/shared/utils/Logger';

dotenv.config()

class UserSequelize extends Model {}
  
UserSequelize.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,   
            allowNull: false         
        },
        phone_number: {
            type: DataTypes.STRING,
        },              
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },            
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shop_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('ADMIN', 'USER'),
            allowNull: false
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
    loggerDataBase.warn('TABLA USER => Las tablas se han sincronizado correctamente');
})
.catch((error) => {
    loggerDataBase.warn('TABLA USER => Error al sincronizar las tablas:', error);
});


export { UserSequelize }
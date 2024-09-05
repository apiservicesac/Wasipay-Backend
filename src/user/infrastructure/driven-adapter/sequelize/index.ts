import { sequelize } from '@/shared/services/sequelize-conector/index'
import dotenv from 'dotenv'
import { DataTypes, Model } from 'sequelize';

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
            allowNull: false,
            unique: true
        },        
        password: {
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

export { UserSequelize }
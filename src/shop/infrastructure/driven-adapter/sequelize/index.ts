import { sequelize } from '@/shared/services/sequelize-conector/index'
import dotenv from 'dotenv'
import { DataTypes, Model } from 'sequelize';
import { loggerDataBase } from '@/shared/utils/Logger';
import { FileSequelize } from '@/file_uploader/infrastructure/driven-adapter/sequelize';

dotenv.config()

class ShopSequelize extends Model {}
  
ShopSequelize.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        postal_code: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        social_media: {
            type: DataTypes.JSONB,
        },
    },
    {
        sequelize,
        modelName: 'Shop',
        tableName: 'shop',
        timestamps: true,
    }
)


ShopSequelize.sync()
.then(() => {
    loggerDataBase.warn('TABLA APPLICATION SHOP => Las tablas se han sincronizado correctamente');
})
.catch((error) => {
    loggerDataBase.warn('TABLA APPLICATION SHOP => Error al sincronizar las tablas:', error);
});


export { ShopSequelize }
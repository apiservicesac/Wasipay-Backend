import { sequelize } from '@/shared/services/sequelize-conector/index'
import dotenv from 'dotenv'
import { DataTypes, Model } from 'sequelize';
import { loggerDataBase } from '@/shared/utils/Logger';

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
            type: DataTypes.STRING(100),
        },
    },
    {
        sequelize,
        modelName: 'Shop',
        tableName: 'shop',
        timestamps: false,
    }
)

ShopSequelize.sync()
.then(() => {
    loggerDataBase.warn('TABLA Shop => Las tablas se han sincronizado correctamente');
})
.catch((error) => {
    loggerDataBase.warn('TABLA Shop => Error al sincronizar las tablas:', error);
});

export { ShopSequelize }

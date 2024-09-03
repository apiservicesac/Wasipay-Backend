import { sequelize } from '@/shared/services/sequelize-conector/index'
import dotenv from 'dotenv'
import { DataTypes, Model } from 'sequelize';
import { loggerDataBase } from '@/shared/utils/Logger';

dotenv.config()

class ProductSequelize extends Model {}

ProductSequelize.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.TEXT,
        },
        price_offer: {
            type: DataTypes.TEXT,
        },
        price_card: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.TEXT,
        },
        category_main: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        subcategory: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'product',
        timestamps: false,
    }
)

ProductSequelize.sync()
.then(() => {
    loggerDataBase.warn('TABLA Product => Las tablas se han sincronizado correctamente');
})
.catch((error) => {
    loggerDataBase.warn('TABLA Product => Error al sincronizar las tablas:', error);
});

export { ProductSequelize }

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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,            
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },              
        sku: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
        },            
        shop_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_category: {
            type: DataTypes.STRING,
        },
        product_type: {
            type: DataTypes.ENUM('SINGLE', 'UNIT', 'BOX'),
        },
        status: {
            type: DataTypes.ENUM('AVAILABLE', 'SOLD_OUT', 'OUT_OF_STOCK'),
            allowNull: false
        },
        visibility: {
            type: DataTypes.ENUM('PUBLISHED', 'SCHEDULED', 'HIDDEN'),            
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'product',
        timestamps: true,
    }
)


ProductSequelize.sync()
.then(() => {
    loggerDataBase.warn('TABLA PRODUCT => Las tablas se han sincronizado correctamente');
})
.catch((error) => {
    loggerDataBase.warn('TABLA PRODUCT => Error al sincronizar las tablas:', error);
});


export { ProductSequelize }
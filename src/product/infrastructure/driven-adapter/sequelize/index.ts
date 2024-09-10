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
            type: DataTypes.TEXT,
        },
        brand: {
            type: DataTypes.TEXT,
        },
        discount: {
            type: DataTypes.STRING(100),
        },
        price: {
            type: DataTypes.STRING(100),
        },
        price_offer: {
            type: DataTypes.STRING(100),
        },
        price_card: {
            type: DataTypes.STRING(100),
        },
        image: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.TEXT,
        },
        category_main: {
            type: DataTypes.STRING(100),
        },
        category: {
            type: DataTypes.STRING(100),
        },
        subcategory: {
            type: DataTypes.STRING(100),
        },
        shop_id: {
            type: DataTypes.UUID,
            references: {
                model: 'shop',
                key: 'id'
            },
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'product',
        timestamps: false,
    }
)


export { ProductSequelize }

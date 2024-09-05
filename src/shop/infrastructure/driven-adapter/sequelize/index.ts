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
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        imageId: {
            type: DataTypes.UUID,
            references: {
                model: 'image',
                key: 'id'
            },
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Shop',
        tableName: 'shop',
        timestamps: false,
    }
)

export { ShopSequelize }

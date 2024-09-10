import { sequelize } from '@/shared/services/sequelize-conector/index';
import dotenv from 'dotenv';
import { DataTypes, Model } from 'sequelize';

dotenv.config();

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
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image_id: {
            type: DataTypes.UUID,
            references: {
                model: 'image',
                key: 'id'
            },
            allowNull: true,
        },
        social_media: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Shop',
        tableName: 'shop',
        timestamps: true,
    }
);

export { ShopSequelize };

import { ImageSequelize } from "@/image_uploader/infrastructure/driven-adapter/sequelize";
import { ShopSequelize } from "@/shop/infrastructure/driven-adapter/sequelize";

// Definir las asociaciones
ShopSequelize.belongsTo(ImageSequelize, {
    as: 'image',
    foreignKey: 'imageId'
});

ImageSequelize.hasOne(ShopSequelize, {
    as: 'shop',
    foreignKey: 'imageId'
});
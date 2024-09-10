import { ImageSequelize } from "@/image_uploader/infrastructure/driven-adapter/sequelize";
import { ProductSequelize } from "@/product/infrastructure/driven-adapter/sequelize";
import { ShopSequelize } from "@/shop/infrastructure/driven-adapter/sequelize";

// Definir las asociaciones
ShopSequelize.belongsTo(ImageSequelize, {
    as: 'image',
    foreignKey: 'image_id'
});

ImageSequelize.hasOne(ShopSequelize, {
    as: 'shop',
    foreignKey: 'image_id'
});

// Definir las asociaciones
ProductSequelize.belongsTo(ImageSequelize, {
    as: 'shop',
    foreignKey: 'shop_id'
});

ShopSequelize.hasOne(ShopSequelize, {
    as: 'product',
    foreignKey: 'shop_id'
});
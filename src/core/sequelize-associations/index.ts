import { FileSequelize } from "@/image_uploader/infrastructure/driven-adapter/sequelize";
import { ShopSequelize } from "@/shop/infrastructure/driven-adapter/sequelize";

// ShopSequelize.js
ShopSequelize.belongsToMany(FileSequelize, { as: 'image', through: 'shop_image', timestamps: false });

// FileSequelize.js
FileSequelize.belongsToMany(ShopSequelize, { as: 'image', through: 'image_shop', timestamps: false });


import { loggerDataBase } from "@/shared/utils/Logger";
import { sequelize } from '@/shared/services/sequelize-conector/index';
import { ImageSequelize } from "@/image_uploader/infrastructure/driven-adapter/sequelize";
import { ShopSequelize } from "@/shop/infrastructure/driven-adapter/sequelize";
import { ProductSequelize } from "@/product/infrastructure/driven-adapter/sequelize";

// Sincronizar las tablas en el orden correcto
sequelize.sync({ force: false })
    .then(async () => {

        await ProductSequelize.sync().then(() => {
            loggerDataBase.warn('TABLA Product => Las tablas se han sincronizado correctamente');
        })
        .catch((error) => {
            loggerDataBase.warn('TABLA Product => Error al sincronizar las tablas:', error);
        });

        await ImageSequelize.sync().then(() => {
            loggerDataBase.warn('TABLA Image => Las tablas se han sincronizado correctamente');
        })
        .catch((error) => {
            loggerDataBase.warn('TABLA Image => Error al sincronizar las tablas:', error);
        });

        await ShopSequelize.sync().then(() => {
            loggerDataBase.warn('TABLA Shop => Las tablas se han sincronizado correctamente');
        })
        .catch((error) => {
            loggerDataBase.warn('TABLA Shop => Error al sincronizar las tablas:', error);
        });
    })
    .catch((error) => {
        loggerDataBase.warn('Error al sincronizar las tablas:', error);
    });

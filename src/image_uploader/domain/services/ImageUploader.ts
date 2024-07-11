import { mkdirSync } from 'fs';
import sharp from 'sharp';
import smartcrop from 'smartcrop-sharp';
import { join } from 'path';
import sha1 from 'sha1';
import { ImageUploadException } from "@/image_uploader/domain/exceptions"

export class ImageUploader {

  async upload(shop_folder: string, type: 'profile' | 'products' | 'payments', name_folder: string | null, image: any): Promise<Object> {
    const resize_width = type === 'profile' || type ===  'payments' ? 112 : 224  
    const resize_height = type === 'profile' || type ===  'payments' ? 112 : 300
    const BASE_IMAGE_UPLOAD_PATH = join(
      process.env.PATH_IMAGES_UPLOAD!,
      shop_folder,
      type,
      name_folder ? name_folder : ''
    );

    mkdirSync(BASE_IMAGE_UPLOAD_PATH, { recursive: true });
    
    const imageName = sha1(Date.now().toString() + image.originalname);    
    let imagePath = join(BASE_IMAGE_UPLOAD_PATH, `${imageName}.${image.mimetype.replace('image/', '')}`);        

    try{
      switch (image.mimetype) {
        case 'image/png':
          await smartcrop.crop(image.data, { width: resize_width, height: resize_height })
          .then(function(result) {
            const crop = result.topCrop;
            return sharp(image.data)
              .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
              .resize(resize_width, resize_height)
              .png().toFile(imagePath);
          })
          break;
        case 'image/jpeg' || 'image/jpg':
          await sharp(image.data).resize(resize_width, resize_height).jpeg().toFile(imagePath);                  
          break;      
        default:
          throw new ImageUploadException()
      }
      
    }catch(e) {
      throw new ImageUploadException()
    }
    imagePath = imagePath.replace(
      process.env.PATH_IMAGES_UPLOAD!,
      `${process.env.IMAGE_SERVER_UPLOADS!}/uploads`,
    );
    return {
      file_name: imageName,
      file_path: imagePath
    };
  }
}

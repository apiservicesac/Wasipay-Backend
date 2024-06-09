import { unlinkSync, existsSync } from 'fs';
import { ImageRemoveException } from "@/image_uploader/domain/exceptions";

export class ImageRemove {

  async run(url: string): Promise<void> {
    try {

      const image_path = url.replace(        
        `${process.env.IMAGE_SERVER_UPLOADS!}/uploads`,
        process.env.PATH_IMAGES_UPLOAD!,
      );

      if (existsSync(image_path)) {
        unlinkSync(image_path);
      } else {
        throw new ImageRemoveException();
      }
    } catch (e) {
      throw new ImageRemoveException();
    }
  }
}
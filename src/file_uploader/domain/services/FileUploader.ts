import { mkdirSync } from 'fs';
import sharp from 'sharp';
import { join } from 'path';
import sha1 from 'sha1';
import { FileUploadException } from "@/file_uploader/domain/exceptions"

export class FileUploader {
    private BASE_FILE_UPLOAD_PATH

    constructor () {
        this.BASE_FILE_UPLOAD_PATH = join(
            process.env.PATH_FILES_UPLOAD!,
            new Date().getFullYear().toString(),
            new Date().getMonth().toString(),
            new Date().getDate().toString(),
          );
    }

  async upload(file: any): Promise<Object> {

    mkdirSync(this.BASE_FILE_UPLOAD_PATH, { recursive: true });
    
    const fileName = sha1(Date.now().toString() + file.originalname);    
    let filePath = join(this.BASE_FILE_UPLOAD_PATH, `${fileName}.${file.mimetype.replace('image/', '')}`);        

    try{
      switch (file.mimetype) {
        case 'image/png':
          await sharp(file.data).png().toFile(filePath);
          break;
        case 'image/jpeg' || 'image/jpg':
          await sharp(file.data).jpeg().toFile(filePath);
          break;      
        default:
          throw new FileUploadException()
      }
      
    }catch(e) {
      throw new FileUploadException()
    }
    filePath = filePath.replace(
      process.env.PATH_FILES_UPLOAD!,
      `${process.env.FILE_SERVER_UPLOADS!}/uploads`,
    );
    return {
      file_name: fileName,
      file_path: filePath
    };
  }
}

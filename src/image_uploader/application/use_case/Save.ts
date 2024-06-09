import { ImageEntity as Entity } from "@/image_uploader/domain/entities"
import { ImageUploadRepository as Repository } from "@/image_uploader/domain/repositories"
import { ImageUploader } from "@/image_uploader/domain/services"
import { ImageValidator } from "@/image_uploader/domain/services"
import { CreateEntityException } from "@/shared/exceptions"
import { ImageUploadException, ImageValidatorException } from "@/image_uploader/domain/exceptions"
import { UploadedFile } from "express-fileupload"

export class SaveImageUseCase {

    private readonly _repository: Repository
    private readonly _image_validator: ImageValidator
    private readonly _image_uploader: ImageUploader

    constructor(
        repository: Repository
    ) {
        this._repository = repository
        this._image_validator = new ImageValidator()
        this._image_uploader = new ImageUploader()
    }

    async run(images: UploadedFile | UploadedFile[] | undefined): Promise<Entity[]> {
        
        if(!images) throw new ImageUploadException()

        let request_images : UploadedFile[] = []

        if (images instanceof Array) {
            request_images = images;
        } else {
            request_images = [images!];
        }
        
        const entities_response : Entity[] = await Promise.all(
            request_images.map(async (image) => {
                const is_image_valid = this._image_validator.run(image)
                if(!is_image_valid) throw new ImageValidatorException()
                const image_uploaded : any = await this._image_uploader.upload(image)
                const newEntity : Entity = {
                    name: image_uploaded.file_name,
                    url: image_uploaded.file_path
                }
                const entity: Entity | null = await this._repository.save(newEntity)
                if(entity === null) throw new CreateEntityException()
                return entity
            })  
        )

        return entities_response
    }
}

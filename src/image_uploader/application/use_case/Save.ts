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

    async run(shop_folder: string, type: 'profile', name_folder: string | null, image: UploadedFile | undefined): Promise<Entity> {
        
        if(!image) throw new ImageUploadException()
        
        const is_image_valid = this._image_validator.run(image)
        if(!is_image_valid) throw new ImageValidatorException()
        const image_uploaded : any = await this._image_uploader.upload(shop_folder, type, name_folder, image)
        const newEntity : Entity = {
            name: image_uploaded.image_name,
            url: image_uploaded.image_path
        }
        const entity: Entity | null = await this._repository.save(newEntity)
        
        if(entity === null) throw new CreateEntityException()
        return entity
    }
}

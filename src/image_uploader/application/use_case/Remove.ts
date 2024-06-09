import { ImageEntity as Entity } from "@/image_uploader/domain/entities"
import { ImageUploadRepository as Repository } from "@/image_uploader/domain/repositories"
import { ImageRemove } from "@/image_uploader/domain/services"
import { NotFoundEntityException } from "@/shared/exceptions"

export class RemoveImageUseCase {

    private readonly _repository: Repository
    private readonly _image_remove: ImageRemove


    constructor(
        repository: Repository
    ) {
        this._repository = repository
        this._image_remove = new ImageRemove()

    }

    async run(ids: string[]): Promise<void> {                
        await Promise.all(
            ids.map(async (id) => {                
                const entity: Entity | null = await this._repository.getById(id)
                if(entity === null) throw new NotFoundEntityException()            
                await this._image_remove.run(entity?.url!)
            })  
        ) 
        await this._repository.delete(ids)
    }
}

import { ProductEntity as Entity } from "@/product/domain/entities"
import { ProductDtoMapper } from "@/product/domain/mappers"
import { ProductRepository as Repository } from "@/product/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"

export class DeleteImagesdUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id: string, image_ids: string[]): Promise<Entity> {
       
        const entity: Entity | null = await this._repository.update_delete_images(id, image_ids)

        if(entity === null) throw new UpdateEntityException()
        
        return ProductDtoMapper.toJson(entity)
    }
}

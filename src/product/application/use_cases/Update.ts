import { ProductEntity as Entity } from "@/product/domain/entities"
import { ProductDtoMapper } from "@/product/domain/mappers"
import { ProductRepository as Repository } from "@/product/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"

export class UpdateUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id: string, data: Entity): Promise<Entity> {
       
        const entity: Entity | null = await this._repository.update(id, data)

        if(entity === null) throw new UpdateEntityException()
        
        return ProductDtoMapper.toJson(entity)
    }
}

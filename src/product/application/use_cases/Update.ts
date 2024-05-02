import { ProductEntity as Entity } from "@/product/domain/entities"
import { ProductRepository as Repository } from "@/product/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"

export class UpdateUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(data: Entity): Promise<Entity> {
       
        const entity: Entity | null = await this._repository.update(data)

        if(entity === null) throw new UpdateEntityException()
        
        return entity
    }
}

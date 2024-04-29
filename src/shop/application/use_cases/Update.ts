import { ShopEntity as Entity } from "@/shop/domain/entities"
import { ShopRepository as Repository } from "@/shop/domain/repositories"
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

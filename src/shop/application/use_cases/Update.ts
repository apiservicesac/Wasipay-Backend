import { ShopEntity as Entity } from "@/shop/domain/entities"
import { ShopRepository as Repository } from "@/shop/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"
import { ShopDtoMapper } from "@/shop/domain/mappers"

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
        
        return ShopDtoMapper.toJson(entity)
    }
}

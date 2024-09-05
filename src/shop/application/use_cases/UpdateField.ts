import { ShopEntity as Entity } from "@/shop/domain/entities"
import { ShopRepository as Repository } from "@/shop/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"
import { ShopDtoMapper } from "@/shop/domain/mappers"

export class UpdateFieldUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id : string, field : string, value : any): Promise<Entity> {
       
        const entity: Entity | null = await this._repository.update_field(id, field, value)

        if(entity === null) throw new UpdateEntityException()
        
        return ShopDtoMapper.toJson(entity)
    }
}

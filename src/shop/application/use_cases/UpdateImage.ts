import { ShopEntity as Entity } from "@/shop/domain/entities"
import { ShopRepository as Repository } from "@/shop/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"
import { ShopDtoMapper } from "@/shop/domain/mappers"

export class UpdateImageUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(shop_id: string, image_id: string): Promise<Entity> {
       
        const entity: Entity | null = await this._repository.update_image(shop_id, image_id)
        
        if(entity === null) throw new UpdateEntityException()
        
        return ShopDtoMapper.toJson(entity)
    }
}
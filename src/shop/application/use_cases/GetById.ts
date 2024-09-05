import { NotFoundEntityException } from '@/shared/exceptions'
import { ShopEntity as Entity } from '@/shop/domain/entities'
import { ShopDtoMapper } from '@/shop/domain/mappers'
import { ShopRepository as Repository } from '@/shop/domain/repositories'

export class GetByIdUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id: string): Promise<Entity> {
        const entity: Entity | null = await this._repository.getById(id)

        if(!entity) throw new NotFoundEntityException()

        return ShopDtoMapper.toJson(entity)
    }
}

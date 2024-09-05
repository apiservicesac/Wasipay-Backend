import { ShopEntity as Entity } from '@/shop/domain/entities'
import { ShopDtoMapper } from '@/shop/domain/mappers'
import { ShopRepository as Repository } from '@/shop/domain/repositories'

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(): Promise<Entity[] | null > {
        const entities: Entity[] | null = await this._repository.getAll()
        return entities.map((entity) => ShopDtoMapper.toJson(entity))
    }
}

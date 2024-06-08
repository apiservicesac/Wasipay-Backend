import { ProductEntity as Entity } from '@/product/domain/entities'
import { ProductDtoMapper } from '@/product/domain/mappers'
import { ProductRepository as Repository } from '@/product/domain/repositories'

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(shop_id: string): Promise<Entity[] | null > {
        const entities: Entity[] | null = await this._repository.getAll(shop_id)
        return entities.map((entity) => ProductDtoMapper.toJson(entity))
    }
}

import { AddressEntity as Entity } from '@/address/domain/entities'
import { AddressDtoMapper } from '@/address/domain/mappers'
import { AddressRepository as Repository } from '@/address/domain/repositories'

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(customer_id: string): Promise<Entity[] | null > {
        const entities: Entity[] | null = await this._repository.getAll(customer_id)
        return entities.map((entity) => AddressDtoMapper.toJson(entity))
    }
}

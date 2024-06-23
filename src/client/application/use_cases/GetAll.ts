import { ClientEntity as Entity } from '@/client/domain/entities'
import { ClientDtoMapper } from '@/client/domain/mappers'
import { ClientRepository as Repository } from '@/client/domain/repositories'

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(): Promise<Entity[] | null > {
        const entities: Entity[] | null = await this._repository.getAll()
        return entities.map((entity) => ClientDtoMapper.toJson(entity))
    }
}

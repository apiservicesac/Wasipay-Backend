import { NotFoundEntityException } from '@/shared/exceptions'
import { ClientEntity as Entity } from '@/client/domain/entities'
import { ClientDtoMapper } from '@/client/domain/mappers'
import { ClientRepository as Repository } from '@/client/domain/repositories'

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

        return ClientDtoMapper.toJson(entity)
    }
}

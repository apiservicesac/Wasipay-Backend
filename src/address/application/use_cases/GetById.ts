import { AddressEntity as Entity } from '@/address/domain/entities'
import { AddressDtoMapper } from '@/address/domain/mappers'
import { AddressRepository as Repository } from '@/address/domain/repositories'
import { NotFoundEntityException } from '@/shared/exceptions'

export class GetByIdUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id: string): Promise<Entity | null > {
        const entity: Entity | null = await this._repository.getById(id)

        if(!entity) throw new NotFoundEntityException()

        return AddressDtoMapper.toJson(entity)
        
    }
}

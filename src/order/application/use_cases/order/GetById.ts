import { OrderEntity as Entity } from '@/order/domain/entities'
import { OrderDtoMapper } from '@/order/domain/mappers'
import { OrderRepository as Repository } from '@/order/domain/repositories'
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

        return OrderDtoMapper.toJson(entity)
        
    }
}

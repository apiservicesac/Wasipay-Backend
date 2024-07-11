import { PaymentMethodEntity as Entity } from '@/payment_method/domain/entities'
import { PaymentMethodDtoMapper } from '@/payment_method/domain/mappers'
import { PaymentMethodRepository as Repository } from '@/payment_method/domain/repositories'

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(): Promise<Entity[] | null > {
        const entities: Entity[] | null = await this._repository.getAll()
        return entities.map((entity) => PaymentMethodDtoMapper.toJson(entity))
    }
}

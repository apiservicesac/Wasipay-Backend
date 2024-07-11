import { PaymentMethodEntity as Entity } from '@/payment_method/domain/entities'
import { PaymentMethodDtoMapper } from '@/payment_method/domain/mappers'
import { PaymentMethodRepository as Repository } from '@/payment_method/domain/repositories'
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

        return PaymentMethodDtoMapper.toJson(entity)
        
    }
}

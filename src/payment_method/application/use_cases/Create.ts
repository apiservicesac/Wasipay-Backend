import { PaymentMethodEntity as Entity } from "@/payment_method/domain/entities"
import { PaymentMethodDtoMapper } from "@/payment_method/domain/mappers"
import { PaymentMethodRepository as Repository } from "@/payment_method/domain/repositories"
import { CreateEntityException } from "@/shared/exceptions"

export class CreateUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(data: Entity): Promise<Entity> {

        const entity: Entity | null = await this._repository.save(data)

        if(entity === null) throw new CreateEntityException()
        
        return PaymentMethodDtoMapper.toJson(entity)
    }
}

import { OrderPaymentEntity as Entity } from "@/order/domain/entities"
import { OrderPaymentRepository as Repository } from "@/order/domain/repositories"
import { OrderPaymentDtoMapper } from "@/order/domain/mappers"
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
        
        return OrderPaymentDtoMapper.toJson(entity)
    }
}

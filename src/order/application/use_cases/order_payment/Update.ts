import { OrderPaymentEntity as Entity } from "@/order/domain/entities"
import { OrderPaymentDtoMapper } from "@/order/domain/mappers"
import { OrderPaymentRepository as Repository } from "@/order/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"

export class UpdateUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id: string, data: Entity): Promise<Entity> {
       
        const entity: Entity | null = await this._repository.update(id, data)

        if(entity === null) throw new UpdateEntityException()
        
        return OrderPaymentDtoMapper.toJson(entity)
    }
}

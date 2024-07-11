import { PaymentMethodEntity as Entity } from "@/payment_method/domain/entities"
import { PaymentMethodDtoMapper } from "@/payment_method/domain/mappers"
import { PaymentMethodRepository as Repository } from "@/payment_method/domain/repositories"
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
        
        return PaymentMethodDtoMapper.toJson(entity)
    }
}

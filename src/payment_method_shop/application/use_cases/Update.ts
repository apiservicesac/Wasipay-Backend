import { PaymentMethodShopEntity as Entity } from "@/payment_method_shop/domain/entities"
import { PaymentMethodShopDtoMapper } from "@/payment_method_shop/domain/mappers"
import { PaymentMethodShopRepository as Repository } from "@/payment_method_shop/domain/repositories"
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
        
        return PaymentMethodShopDtoMapper.toJson(entity)
    }
}

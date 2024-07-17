import { PaymentMethodShopRepository as Repository } from "@/payment_method_shop/domain/repositories"
import { DeleteEntityException } from "@/shared/exceptions"

export class DeleteUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(shop_id: string, id: string): Promise<void | null > {
       
        const deleted = await this._repository.delete(shop_id, id)

        if(deleted === null) throw new DeleteEntityException()

    }
}

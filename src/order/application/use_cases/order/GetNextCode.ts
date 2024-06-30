import { OrderRepository as Repository } from "@/order/domain/repositories"
import { NotFoundEntityException } from "@/shared/exceptions"

export class GetNextCodeUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(shop_id: string): Promise<string> {

        const order_code: string | null = await this._repository.getNextCode(shop_id)

        if(order_code === null) throw new NotFoundEntityException()
        
        return order_code
    }
}

import { OrderRepository as Repository } from "@/order/domain/repositories"
import { DeleteEntityException } from "@/shared/exceptions"

export class DeleteUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id: string): Promise<void | null > {
       
        const deleted = await this._repository.delete(id)

        if(deleted === null) throw new DeleteEntityException()

    }
}

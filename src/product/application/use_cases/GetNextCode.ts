import { ProductRepository as Repository } from "@/product/domain/repositories"
import { NotFoundEntityException } from "@/shared/exceptions"

export class GetNextCodeUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(shop_id: string): Promise<string> {

        const code_product: string | null = await this._repository.getNextCode(shop_id)

        if(code_product === null) throw new NotFoundEntityException()
        
        return code_product
    }
}

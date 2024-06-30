import { AddressEntity as Entity } from "@/address/domain/entities"
import { AddressDtoMapper } from "@/address/domain/mappers"
import { AddressRepository as Repository } from "@/address/domain/repositories"
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
        
        return AddressDtoMapper.toJson(entity)
    }
}

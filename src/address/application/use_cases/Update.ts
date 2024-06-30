import { AddressEntity as Entity } from "@/address/domain/entities"
import { AddressDtoMapper } from "@/address/domain/mappers"
import { AddressRepository as Repository } from "@/address/domain/repositories"
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
        
        return AddressDtoMapper.toJson(entity)
    }
}

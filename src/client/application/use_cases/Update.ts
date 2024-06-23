import { ClientEntity as Entity } from "@/client/domain/entities"
import { ClientRepository as Repository } from "@/client/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"
import { ClientDtoMapper } from "@/client/domain/mappers"

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
        
        return ClientDtoMapper.toJson(entity)
    }
}

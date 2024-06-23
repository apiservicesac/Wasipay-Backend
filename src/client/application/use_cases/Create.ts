import { ClientEntity as Entity } from "@/client/domain/entities"
import { ClientRepository as Repository } from "@/client/domain/repositories"
import { CreateEntityException } from "@/shared/exceptions"
import { ClientDtoMapper } from "@/client/domain/mappers"

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
        
        return ClientDtoMapper.toJson(entity)
    }
}

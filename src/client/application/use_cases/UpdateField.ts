import { ClientEntity as Entity } from "@/client/domain/entities"
import { ClientRepository as Repository } from "@/client/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"
import { ClientDtoMapper } from "@/client/domain/mappers"

export class UpdateFieldUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id : string, field : string, value : any): Promise<Entity> {
       
        const entity: Entity | null = await this._repository.update_field(id, field, value)

        if(entity === null) throw new UpdateEntityException()
        
        return ClientDtoMapper.toJson(entity)
    }
}

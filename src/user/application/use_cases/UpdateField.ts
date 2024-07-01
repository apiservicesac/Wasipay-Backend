import { UserRepository as Repository } from "@/user/domain/repositories"
import { UserEntity as Entity } from "@/user/domain/entities"
import { UserDtoMapper } from "@/user/domain/mappers"
import { UpdateEntityException } from "@/shared/exceptions"

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
        
        return UserDtoMapper.toJson(entity)
    }
}

import { UserEntity as Entity } from "@/user/domain/entities"
import { UserRepository as Repository } from "@/user/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"
import { UserDtoMapper } from "@/user/domain/mappers"

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

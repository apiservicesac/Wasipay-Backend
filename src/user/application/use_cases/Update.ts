import { UserRepository as Repository } from "@/user/domain/repositories"
import { UserEntity as Entity } from "@/user/domain/entities"
import { UserDtoMapper } from "@/user/domain/mappers"
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
        
        return UserDtoMapper.toJson(entity)
    }
}

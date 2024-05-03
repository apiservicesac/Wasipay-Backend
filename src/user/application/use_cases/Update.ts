import { UserEntity as Entity } from "@/user/domain/entities"
import { UserRepository as Repository } from "@/user/domain/repositories"
import { UpdateEntityException } from "@/shared/exceptions"
import { UserDtoMapper } from "@/user/domain/mappers"

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

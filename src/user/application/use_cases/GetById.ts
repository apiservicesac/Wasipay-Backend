import { NotFoundEntityException } from "@/shared/exceptions"
import { UserRepository as Repository } from "@/user/domain/repositories"
import { UserEntity as Entity } from "@/user/domain/entities"
import { UserDtoMapper } from "@/user/domain/mappers"

export class GetByIdUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(id: string): Promise<Entity | null > {
        const entity: Entity | null = await this._repository.getById(id)
        if(entity === null) throw new NotFoundEntityException()
        return UserDtoMapper.toJson(entity)
    }
}

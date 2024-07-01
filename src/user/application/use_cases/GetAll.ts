import { UserRepository as Repository } from "@/user/domain/repositories"
import { UserEntity as Entity } from "@/user/domain/entities"
import { UserDtoMapper } from "@/user/domain/mappers"

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(): Promise<Entity[] | null > {
        const entities: Entity[] | null = await this._repository.getAll()
        return entities.map((entity) => UserDtoMapper.toJson(entity))
    }
}

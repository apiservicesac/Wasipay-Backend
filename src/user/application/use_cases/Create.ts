import { UserRepository as Repository } from "@/user/domain/repositories"
import { UserEntity as Entity } from "@/user/domain/entities"
import { UserDtoMapper } from "@/user/domain/mappers"
import { CreateEntityException } from "@/shared/exceptions"
import { PasswordManager } from "@/shared/utils/PasswordManager"

export class CreateUseCase {

    private readonly _repository: Repository
    private readonly _password_encrypt: PasswordManager

    constructor(
        repository: Repository
    ) {
        this._repository = repository
        this._password_encrypt = new PasswordManager()
    }

    async run(data: Entity): Promise<Entity> {
        const password_ecnrypt : string = await this._password_encrypt.hashPassword(data.password!)
        
        data.password = password_ecnrypt

        const entity: Entity | null = await this._repository.save(data)

        if(entity === null) throw new CreateEntityException()

        return UserDtoMapper.toJson(entity)
    }
}

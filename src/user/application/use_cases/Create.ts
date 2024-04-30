import { UserEntity as Entity } from "@/user/domain/entities"
import { UserRepository } from "@/user/domain/repositories"
import { UserAlreadyExistsExceptions } from "../../domain/exceptions"
import { PasswordManager } from "@/shared/utils/PasswordManager"
import { CreateEntityException } from "@/shared/exceptions"

export class CreateUseCase {

    private readonly _userRepository: UserRepository
    private readonly _encryptUserPassword: PasswordManager

    constructor(
        userRepository: UserRepository
    ) {
        this._userRepository = userRepository
        this._encryptUserPassword = new PasswordManager()
    }

    async run(data: Entity): Promise<any> {
        const existUser = await this._userRepository.getByEmail(data.email!)

        if (existUser) throw new UserAlreadyExistsExceptions()        
    
        data.password = await this._encryptUserPassword.hashPassword(data.password!)

        const userCreated: Entity | null = await this._userRepository.save(data)
        
        if (!userCreated) throw new CreateEntityException()
        
        return userCreated;
    }
}

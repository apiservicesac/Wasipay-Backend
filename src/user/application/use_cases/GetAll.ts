import { User } from "../../domain/entities"
import { UserRepository } from "../../domain/repositories"
import { UserVerifyRoleAdmin } from "../../domain/services"
import { InsufficientRoleException } from "../../domain/exceptions"

export class UserGetAllUseCase {

    private readonly _userRepository: UserRepository
    private readonly _currentUserIsAdmin : UserVerifyRoleAdmin

    constructor (userRepository : UserRepository) {
        this._userRepository = userRepository
        this._currentUserIsAdmin = new UserVerifyRoleAdmin(userRepository)
    }

    async run (): Promise<User[]> {

        return await this._userRepository.getAll()
    }

}
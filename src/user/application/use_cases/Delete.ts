import { User} from "../../domain/entities"
import { UserRepository } from "../../domain/repositories"
import { UserVerifyRoleAdmin, ExistUserByEmail } from "../../domain/services"
import { UserNotFoundException, InsufficientRoleException } from "../../domain/exceptions"

export class UserDeleteUseCase {

    private readonly _userRepository: UserRepository
    private readonly _existUserByEmail: ExistUserByEmail
    private readonly _currentUserIsAdmin : UserVerifyRoleAdmin

    constructor(
        userRepository: UserRepository
    ) {
        this._userRepository = userRepository
        this._currentUserIsAdmin = new UserVerifyRoleAdmin(userRepository)
        this._existUserByEmail = new ExistUserByEmail(userRepository)
    }

    async run(email: string): Promise<void> {

        const existUser = await this._existUserByEmail.run(email)

        if (!existUser) throw new UserNotFoundException()
        
        await this._userRepository.delete(existUser)

    }

}

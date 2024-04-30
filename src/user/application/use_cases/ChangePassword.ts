import { User } from "../../domain/entities"
import { UserRepository } from "../../domain/repositories"
import { ExistUserByEmail } from "../../domain/services"
import { UserNotFoundException, IncorrectPasswordException, UserUpdateFailedException } from "../../domain/exceptions"
import { PasswordManager } from "../../../shared/utils/PasswordManager"

export class UserChangePasswordUseCase {
    private readonly _existUserByEmail : ExistUserByEmail
    private readonly _checkPassword : PasswordManager
    private readonly _userRepository: UserRepository
    private readonly _encryptUserPassword: PasswordManager


    constructor (userRepository : UserRepository) {
        this._userRepository = userRepository,
        this._existUserByEmail = new ExistUserByEmail(userRepository)
        this._checkPassword = new PasswordManager()
        this._encryptUserPassword = new PasswordManager()
    }

    async run (userChangePassword : User, newPassword : string ): Promise<any> {

        const user = await this._existUserByEmail.run(userChangePassword.email!)
        
        if (!user) throw new UserNotFoundException()

        const isValidPassord = await this._checkPassword.comparePasswords(userChangePassword.password!, user?.password!)

        if (!isValidPassord) throw new IncorrectPasswordException()

        user.password = await this._encryptUserPassword.hashPassword(newPassword)
        
        const userUpdated: User = await this._userRepository.update(user)

        if(userUpdated == null) throw new UserUpdateFailedException()

        return {
            userUpdated
        }
    }

}
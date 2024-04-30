import { User} from "../../domain/entities"
import { UserRepository } from "../../domain/repositories"
import { UserVerifyRoleAdmin, ExistUserByEmail } from "../../domain/services"
import { UserNotFoundException, InsufficientRoleException, UserUpdateFailedException } from "../../domain/exceptions"
import { PasswordManager } from "../../../shared/utils/PasswordManager"
import { GeneratePasswordManager } from "../../../shared/utils/GeneratePasswordManager"

export class UserResetPasswordUseCase {

    private readonly _userRepository: UserRepository
    private readonly _existUserByEmail: ExistUserByEmail
    private readonly _encryptUserPassword: PasswordManager
    private readonly _passwordGenerator: GeneratePasswordManager
    private readonly _currentUserIsAdmin : UserVerifyRoleAdmin

    constructor(
        userRepository: UserRepository
    ) {
        this._userRepository = userRepository
        this._currentUserIsAdmin = new UserVerifyRoleAdmin(userRepository)
        this._existUserByEmail = new ExistUserByEmail(userRepository)
        this._encryptUserPassword = new PasswordManager()
        this._passwordGenerator = new GeneratePasswordManager()
    }

    async run(email: string): Promise<any> {

        const user = await this._existUserByEmail.run(email)

        if (!user) throw new UserNotFoundException()
        
        const generatePassword = await this._passwordGenerator.generate()
        
        user.password = await this._encryptUserPassword.hashPassword(generatePassword)

        const userUpdated: User = await this._userRepository.update(user)

        if(userUpdated == null) throw new UserUpdateFailedException()
        
        return {
            userUpdated,
            generatePassword
        }
    }
}

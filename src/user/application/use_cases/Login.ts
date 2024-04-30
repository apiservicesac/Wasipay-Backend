import { User } from "../../domain/entities"
import { UserRepository } from "../../domain/repositories"
import { ExistUserByEmail } from "../../domain/services"
import { UserNotFoundException, IncorrectPasswordException } from "../../domain/exceptions"
import { TokenManager } from "../../../shared/utils/TokenManager"
import { PasswordManager } from "../../../shared/utils/PasswordManager"

export class UserLoginUseCase {
    private readonly _existUserByEmail : ExistUserByEmail
    private readonly _checkPassword : PasswordManager
    private readonly _tokenGenerator: TokenManager

    constructor (userRepository : UserRepository) {
        this._existUserByEmail = new ExistUserByEmail(userRepository)
        this._checkPassword = new PasswordManager()
        this._tokenGenerator = new TokenManager()
    }

    async run (userLogin : User ): Promise<any> {

        const user = await this._existUserByEmail.run(userLogin.email!)
        
        if (!user) throw new UserNotFoundException()

        const isValidPassord = await this._checkPassword.comparePasswords(userLogin.password!, user?.password!)

        if (!isValidPassord) throw new IncorrectPasswordException()

        const accessToken = this._tokenGenerator.generateToken(user)
        const refreshToken = this._tokenGenerator.generateRefreshToken(user)

        return {
            accessToken,
            refreshToken,
            user
        }
    }

}
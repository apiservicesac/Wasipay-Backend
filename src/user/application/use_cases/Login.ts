import { UserRepository as Repository } from "@/user/domain/repositories"
import { AtuhResponse as Response } from "@/user/domain/entities"

import { AuthenticateException } from "@/shared/exceptions"
import { PasswordManager } from "@/shared/utils/PasswordManager"
import { TokenManager } from "@/shared/utils/TokenManager"

export class LoginUseCase {

    private readonly _repository: Repository
    private readonly _password_manager: PasswordManager
    private readonly _token_manager: TokenManager

    constructor(
        repository: Repository
    ) {
        this._repository = repository
        this._password_manager = new PasswordManager(),
        this._token_manager = new TokenManager()
    }

    async run(email: string, password: string): Promise<Response> {

        const user = await this._repository.getByEmail(email)
        
        if (user === null ) throw new AuthenticateException()

        const isValidPassord = await this._password_manager.comparePasswords(password, user.password!)        

        if (!isValidPassord) throw new AuthenticateException()        

        return {
            access_token: this._token_manager.generateAccessToken(user._id, user.role!),
            refresh_token: this._token_manager.generateRefreshToken(user._id, user.role!),
        }
    }
}

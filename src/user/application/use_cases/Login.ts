import { UserEntity as Entity } from "@/user/domain/entities"
import { UserRepository as Repository } from "@/user/domain/repositories"
import { AuthenticateException } from "@/shared/exceptions"
import { PasswordManager } from "@/shared/utils/PasswordManager"
import { TokenManager } from "@/shared/utils/TokenManager"
import { UserResponse as Response } from "@/user/domain/entities"
import { UserDtoMapper } from "@/user/domain/mappers"

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

    async run(email: string, password: string): Promise<Response<Entity>> {

        const user = await this._repository.getByEmail(email)
        
        if (user === null ) throw new AuthenticateException()

        const isValidPassord = await this._password_manager.comparePasswords(password, user.password!)        

        if (!isValidPassord) throw new AuthenticateException()
        
        const user_mapped = UserDtoMapper.toJson(user)

        return {
            user: user_mapped,
            access_token: this._token_manager.generateAccessToken(user._id),
            refresh_token: this._token_manager.generateRefreshToken(user._id),
        }
    }
}

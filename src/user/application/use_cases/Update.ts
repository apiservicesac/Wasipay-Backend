import { User} from "../../domain/entities"
import { UserRepository } from "../../domain/repositories"
import { ExistUserByEmail } from "../../domain/services"
import { UserNotFoundException, UserUpdateFailedException } from "../../domain/exceptions"

export class UserUpdateDetailUseCase {

    private readonly _userRepository: UserRepository
    private readonly _existUserByEmail: ExistUserByEmail

    constructor(
        userRepository: UserRepository
    ) {
        this._userRepository = userRepository
        this._existUserByEmail = new ExistUserByEmail(userRepository)
    }

    async run(user: User, email: string): Promise<any> {
        
            const existingUser = await this._existUserByEmail.run(email);
    
            if (!existingUser) {
                throw new UserNotFoundException();
            }
    
            const userUpdated: User | null = await this._userRepository.updates(email, user);
    
            if (!userUpdated) {
                throw new UserUpdateFailedException();
            }
    
            return {
                userUpdated,
            };
        
    }
}

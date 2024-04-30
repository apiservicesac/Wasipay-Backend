import bcrypt from 'bcrypt'

export class PasswordManager {
    
    constructor() {
    }

    public async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    }

    public async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const match = await bcrypt.compare(plainPassword, hashedPassword)
        return match
    }
}
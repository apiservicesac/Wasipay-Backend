import jwt from 'jsonwebtoken'
import ms from 'ms'

export class TokenManager {
    private readonly secretKey: string

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || 'jwt_secret_key'
    }

    public generateAccessToken(payload: any): string {        
        return jwt.sign(
            {id: payload, type: 'access'},        
            this.secretKey,
            { expiresIn: ms(3600000) }
        );
    }

    public generateRefreshToken(payload: any): string {        
        return jwt.sign(
            {id: payload, type: 'refresh'},
            this.secretKey,
            { expiresIn: ms(3600000 * 24) }
        );
    }
    
    public verifyToken(token: string): { expired: boolean, decoded: any | null } {
        try {
            const decoded = jwt.verify(token, this.secretKey, { complete: true }) as { [key: string]: any }
            const { email, role, user_id, username, type } = decoded.payload
            return { expired: false, decoded: { email, role, user_id, username, type } }
        } catch (error) {
            return { expired: true, decoded: null }
        }
    }

    public decodeToken(token: string): any | null {
        try {
            const decoded = jwt.decode(token) as any
            return decoded
        } catch (error) {
            return null
        }
    }
}

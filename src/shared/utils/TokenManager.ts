import jwt from 'jsonwebtoken';
import ms from 'ms';

export class TokenManager {
    private readonly secretKey: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || 'jwt_secret_key';
    }

    public generateAccessToken(payload: string, role: string): string {        
        return jwt.sign(
            { id: payload, role, type: 'access' },        
            this.secretKey,
            { algorithm: 'HS256', expiresIn: ms('1h') }
        );
    }

    public generateRefreshToken(payload: string, role: string): string {        
        return jwt.sign(
            { id: payload, role, type: 'refresh' },
            this.secretKey,
            { algorithm: 'HS256', expiresIn: ms('24h') }
        );
    }
    
    public verifyToken(token: string): { expired: boolean, decoded: any | null } {
        try {
            const decoded = jwt.verify(token, this.secretKey, { algorithms: ['HS256'] }) as { [key: string]: any };
            const { id, role, type } = decoded;
            return { expired: false, decoded: { id, role, type } };
        } catch (error) {
            return { expired: true, decoded: null };
        }
    }

    public decodeToken(token: string): any | null {
        try {
            const decoded = jwt.decode(token) as any;
            return decoded;
        } catch (error) {
            return null;
        }
    }
}

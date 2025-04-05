import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../interfaces/userinterface.js";
import dotenv from 'dotenv';

dotenv.config();

class TokenService {
    private readonly secretKey: Secret = process.env.SECRET_ACCESS_TOKEN || "secret";
    generateAccessToken(user: IUser): string {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
        }

        const accessToken = jwt.sign(payload, this.secretKey, { expiresIn: '1d' });

        return accessToken;
    }

    /* exemplo de um token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5ZDI3N2Y2LTI2ZWUtNDY4OS1iYjU2LTIzYjcxNzU5MmNmZCIsImVtYWlsIjoicGVkcm8yM0BnbWFpbC5jb20iLCJuYW1lIjoiUGVkcm8iLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3NDM3MTQ4MjQsImV4cCI6MTc0MzgwMTIyNH0.fXEFzOvGVnGCk9b3Tpnghb7v5NnKwhZiZSldNCdRpLs*/
    validateAccessToken(token: string): any {
        try {
            const userPayload = jwt.verify(token, this.secretKey)
            return userPayload;
        } catch(error) {
            return null;
        }
    }
}

export default new TokenService();

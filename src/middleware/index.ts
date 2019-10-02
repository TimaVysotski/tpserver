import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TokenData, DataStoredInToken } from "../interfaces/jwt";

export const Middelware = {
    async createHash(password: any) {
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS as string));
        return hashedPassword;
    },
    async checkPassword(body: any, password: any) {
        const isAuthentication = await bcrypt.compare(password, body.password);
        return isAuthentication;
    },
    async createToken(body: any): Promise<TokenData> {
        const expiresIn = 60 * 60;
        const secret = process.env.SECRET as string;
        const dataStoredInToken: DataStoredInToken = {
            _id: body.id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    },
    async createCookie(tokenData: TokenData){
        return `Authorization=${tokenData.token}; Max-Age=${tokenData.expiresIn}`;
    }
}
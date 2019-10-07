import jwt from "jsonwebtoken";
import { IUserBase } from "../interfaces/user";
import { JWT_CONFIG } from "../constants/secure";


class JwtMiddelware {
    static encrypt = (string: string) => string;
    static getToken = (user: IUserBase) => jwt.sign({id: user._id}, JWT_CONFIG.JWT_SECRET, JWT_CONFIG.JWT_OPTIONS);
};

export default { JwtMiddelware };

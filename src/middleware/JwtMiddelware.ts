import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import JWT_CONFIG from "../constants/jwtSecure";


class JwtMiddelware {
    getToken = (user: IUser) => {
        return jwt.sign({ id: user._id }, JWT_CONFIG.JWT_SECRET, JWT_CONFIG.JWT_OPTIONS)
    };
};

export default JwtMiddelware;

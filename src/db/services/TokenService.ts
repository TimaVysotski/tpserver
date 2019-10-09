import models from "../../models/index";
import { IUser } from "../../interfaces/user";

class TokenService {
    save = (user: IUser, token: string) => {
        user.token = token;
        return user.token;
    };
    delete = (user: IUser) => {
        user.token = undefined;
        return user;
    };
}

export default TokenService;

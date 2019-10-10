import { IToken } from "../../interfaces/token";
import models from "../../models";
import { resolve } from "url";
import { IUser } from "../../interfaces/user";

class TokenService {
    save = (token: IToken) => {
        return new Promise((resolve, reject) => {
            models.token.create(token)
                .then(token => resolve(token))
                .catch(error => reject(error));
        });
    };
    delete = ({ token }: IToken) => {
        return new Promise((resolve, reject) => {
            models.token.findOneAndRemove({ token })
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }
}

export default TokenService;

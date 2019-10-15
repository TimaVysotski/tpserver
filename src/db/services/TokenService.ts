import { IToken } from "../../interfaces/token";
import models from "../../models";

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
                .then(() => resolve("true"))
                .catch(error => reject(error));
        });
    };
};

export default TokenService;

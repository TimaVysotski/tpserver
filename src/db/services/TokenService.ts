import { IToken } from "../../interfaces/token";
import models from "../../models";

class TokenService {
    save = async (tokenModel: IToken) => {
        try {
            const token = await models.token.create(tokenModel);
            return token;
        } catch (error) {
            throw error;
        };
    };
    delete = async ({ token }: IToken) => {
        try {
            await models.token.findOneAndRemove({ token });
            return "true";
        } catch (error) {
            throw error;
        };
    };
};

export default TokenService;

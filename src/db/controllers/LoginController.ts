import UserController from "./UserController";
import { IUser } from "../../interfaces/user";
import TokenService from "../services/TokenService";
import JwtMiddelware from "../../middleware/JwtMiddelware";
import { IToken } from "../../interfaces/token";
import models from "../../models";

class LoginController {
    private controller: UserController;
    private middelware: JwtMiddelware;
    private tokenService: TokenService;


    constructor() {
        this.controller = new UserController();
        this.middelware = new JwtMiddelware();
        this.tokenService = new TokenService();
    };
    login = async (body: IUser) => {
        try {
            const user = await this.controller.checkCredentials(body);
            const token = this.tokenService.save({
                user: user,
                token: this.middelware.getToken(user)
            } as IToken);
            return token;
        } catch (error) {
            throw error;
        };
    };
    logout = async (id: string) => {
        try {
            const token = await models.token.findOne({ user: id });
            await this.tokenService.delete(token as IToken);
            return "true";
        } catch (error) {
            return error;
        };
    };
};

export default LoginController;

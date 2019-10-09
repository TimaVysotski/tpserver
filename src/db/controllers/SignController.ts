import UserController from "./UserController";
import { IUser } from "../../interfaces/user";
import TokenService from "../services/TokenService";
import JwtMiddelware from "../../middleware/JwtMiddelware";
import { IToken } from "../../interfaces/token";

class SignController {
    private controller: UserController;
    private middelware: JwtMiddelware;
    private tokenService: TokenService;


    constructor() {
        this.controller = new UserController();
        this.middelware = new JwtMiddelware();
        this.tokenService = new TokenService();
    }

    login = (body: IUser) => {
        return new Promise((resolve, reject) => {
            try {
                this.controller.checkCredentials(body)
                    .then(user => {
                        try {
                            const token = this.tokenService.save({
                                user: user, 
                                token: this.middelware.getToken(user)
                            } as IToken);
                            resolve(token);
                        } catch (error) {
                            reject(error);
                        }
                    })
                    .catch(error => reject(error));
            } catch (error) {
                reject(error);
            }
        });
    };

    logout = (body: IUser) => {
        return new Promise((resolve, reject) => {
            try {
                // const user = this.tokenService.delete(body);
                // resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default SignController;

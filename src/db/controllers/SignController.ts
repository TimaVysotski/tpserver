import models from "../../models/index";
import UserController from "./UserController";
import { UpdatedUserRequest } from "../../interfaces/express";
import { IUser } from "../../interfaces/user";

class SignController {
    private controller: UserController;

    constructor() {
        this.controller = new UserController();
    }

    login = (body: IUser) => {
        const result = new Promise((resolve, reject) => {
            try {
                this.controller.checkCredentials(body)
                    .then(user => { 
                        resolve(user);
                     })
                    .catch((error: any) => reject(error));
            } catch (error) {
                reject(error);
            }
        });
        return result;
    };
}

export default SignController;

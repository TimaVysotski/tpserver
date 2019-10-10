import models from "../../models/index";
import { UpdatedUserRequest } from "../../interfaces/express";

class SignController {
    create = (body: UpdatedUserRequest) => {
        return new Promise((resolve, reject) => {
            models.user.create(body)
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
    };
}
export default SignController;
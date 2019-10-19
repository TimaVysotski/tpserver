import models from "../../models/index";
import { UpdatedUserRequest } from "../../interfaces/express";

class SignController {
    create = async (body: UpdatedUserRequest) => {
        try {
            const user = await models.user.create(body);
            return user;
        } catch (error) {
            throw error;
        };
    };
};

export default SignController;

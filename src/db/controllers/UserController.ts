import models from "../../models/index";
import BcryptMiddelware from "../../middleware/bcrypt";
import { UpdatedUserRequest } from "../../interfaces/express";
import { IUser } from "../../interfaces/user";
import { CREDENTIALS_ERROR } from "../../constants/api";

class UserController {
    findAll = () => {
        return new Promise((resolve, reject) => {
            models.user.find()
                .then(users => resolve(users))
                .catch(error => reject(error));
        });
    };
    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            models.user.findById(id)
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
    };
    create = (body: UpdatedUserRequest) => {
        return new Promise((resolve, reject) => {
            models.user.create(body)
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
    };
    update = ({ body }: UpdatedUserRequest) => {
        return new Promise((resolve, reject) => {
            models.user.updateOne(body.id, body, { new: true })    // POINT
                .then(user => console.log(user))
                .catch(error => console.log(error));
        });
    };
    delete = (id: string) => {
        return new Promise((resolve, reject) => {
            models.user.findByIdAndRemove(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    };
    find = (username: string) => {
        return new Promise((resolve, reject) => {
            models.user.findOne({ username })
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
    };
    checkCredentials = (body: IUser): Promise<IUser> => {
        return new Promise((resolve, reject) => {
            models.user.findOne({ email: body.email })
                .then(user => {
                    BcryptMiddelware.checkPassword(user!, body.password!)
                        .then((result) => {
                            if (result) {
                                resolve(user!);
                            } else {
                                throw CREDENTIALS_ERROR;
                            }
                        })
                        .catch(error => reject(error));
                })
                .catch(error => reject(error))
        });
    };
}
export default UserController;
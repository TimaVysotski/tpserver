import models from "../../models/index";
import BcryptMiddelware from "../../middleware/bcrypt";
import { UpdatedUserRequest } from "../../interfaces/express";
import { IUser, IPassword, IUserBase } from "../../interfaces/user";
import { CREDENTIALS_ERROR } from "../../constants/api";
import { Validation } from "../../handlers/validation-handler";

class UserController {
    findAll = async () => {
        try {
            const users = await models.user.find();
            return users;
        } catch (error) {
            throw error;
        };
    };
    findById = async (id: string) => {
        try {
            const user = await models.user.findById(id);
            return user;
        } catch (error) {
            throw error;
        };
    };
    create = async (body: UpdatedUserRequest) => {
        try {
            const user = await models.user.create(body);
            return user;
        } catch (error) {
            throw error;
        };
    };
    update = async (body: UpdatedUserRequest) => {
        try {
            const user = await models.user.findById({ _id: body.currentUser._id });
            const searchUser = await user!.update(body);
            return searchUser;
        } catch (error) {
            throw error;
        };
    };
    delete = async (id: string) => {
        try {
            await models.user.findByIdAndRemove(id);
            return;
        } catch (error) {
            return error;
        };
    };
    find = async (username: string) => {
        try {
            const user = await models.user.findOne({ username });
            return user;
        } catch (error) {
            return error;
        };
    };
    checkCredentials = async (body: IUser): Promise<IUser> => {
        try {
            const user = await models.user.findOne({ email: body.email });
            const result = await BcryptMiddelware.checkPassword(user!, body.password!);
            if (result) {
                return user!;
            } else {
                throw CREDENTIALS_ERROR;
            }
        } catch (error) {
            throw error;
        };
    };
    changePassword = async (password: IPassword) => {
        try {
            await BcryptMiddelware.checkPassword(password.user as IUserBase, password.password!);
            Validation.checkUserPassword(password.newPassword!);
            const user = await this.updatePassword(
                password.user as IUser,
                await BcryptMiddelware.createHash(password.newPassword!)
            );
            return user;
        } catch (error) {
            throw error;
        };
    };
    updatePassword = async (user: IUser, newPassword: string) => {
        try {
            const searchUser = await models.user.findByIdAndUpdate(
                user._id, { password: newPassword }, { new: true }
            );
            return searchUser;
        } catch (error) {
            return error;
        };
    };
};

export default UserController;

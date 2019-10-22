import { Gender, validPassword, validUsername, validEmail } from "../constants/validation";
import { IUserBase } from "../interfaces/user";
import validation from "../constants/errors";

export const Validation = {
    notEmpty(body: IUserBase) {
        Object.keys(body).forEach((property: string) => {
            if (!property) {
                throw validation.EMPTY_KEY;
            }
            if (!body[property]) {
                throw validation.EMPTY_PARAMETR + property;
            }
        });
    },
    checkUserData(body: IUserBase) {
        try {
            if (body.email) { this.checkUserEmail(body.email) };
            if (body.username) { this.checkUserUsername(body.username) };
            if (body.password) { this.checkUserPassword(body.password) };
            if (body.gender) { this.checkUserGender(body.gender) };
            return body;
        } catch (error) {
            throw error + validation.DATA_ERROR;
        }
    },
    checkUserEmail(email?: string) {
        if (!email || !validEmail.test(email)) {
            throw validation.EMAIL;
        }
    },
    checkUserUsername(username?: string) {
        if (!username || !validUsername.test(username)) {
            throw validation.USERNAME;
        }
    },
    checkUserPassword(password?: string) {
        if (!password || !validPassword.test(password)) {
            throw validPassword;
        }
    },
    checkUserGender(gender?: string) {
        if (!(<any>Object).values(Gender).includes(gender)) {
            throw validation.GENDER;
        }
    },
};

import { Gender, validPassword, validUsername, validEmail } from "../constants/validation";
import { IUserBase } from "../interfaces/user";
import { IToken } from "../interfaces/token";

export const Validation = {
    notEmpty(body: IUserBase) {
        Object.keys(body).forEach((property: string) => {
            if (!property) {
                throw `Request can not be consist of empty key.`;
            }
            if (!body[property]) {
                throw `Parameter ${property} can not be empty.`;
            }
        });
    },
    checkUserData(body: IUserBase) {
        try {
            console.log(body);
            if (body.email) { this.checkUserEmail(body.email) };
            if (body.username) { this.checkUserUsername(body.username) };
            if (body.password) { this.checkUserPassword(body.password) };
            if (body.gender) { this.checkUserGender(body.gender) };
            return body;
        } catch (error) {
            throw `Error!!! Check ${error} data!`;
        }
    },
    checkUserEmail(email?: string) {
        if (!email || validEmail.test(email)) {
            throw "email";
        }
    },
    checkUserUsername(username?: string) {
        if (!username || !validUsername.test(username)) {
            throw 'username';
        }
    },
    checkUserPassword(password?: string) {
        if (!password || !validPassword.test(password)) {
            throw 'password';
        }
    },
    checkUserGender(gender?: string) {
        if (!(<any>Object).values(Gender).includes(gender)) {
            throw 'gender';
        }
    }
}

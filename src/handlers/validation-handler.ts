import { Gender, validPassword, validUsername } from "../constants/validation";
import { IUserBase } from "../interfaces/user";

export const Validation = {
    notEmpty(body: IUserBase) {
        Object.keys(body).forEach((property: string ) => {
            if (!property) {
                throw `Request can not be consist of empty key.`;
            }
            if (!body[property]) {
                throw `Parameter ${property} can not be empty.`;
            }
        });
    },
    checkForValidUserData( body : IUserBase) {
        try {
            this.checkUserUsername(body.username);
            this.checkUserPassword(body.password);
            this.checkUserGender(body.gender);
        } catch (error) {
            throw `Error!!! Check ${error} data!`;
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

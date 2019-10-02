import { Gender } from "../constants/gender";
import { IUser } from "../interfaces/user";

export const Validation = {
    notEmpty(body: any) {
        Object.keys(body).forEach(property => {
            if (!property) {
                throw `Request can not be consist of empty key.`;
            }
            if (!body[property]) {
                throw `Parameter ${property} can not be empty.`;
            }
        });
    },
    checkForValidUserData({ body: { username, password, gender } }: any) {
        if (!Object.values(Gender).includes(gender)) {
            throw `Error!!! Invalid Gender data.`;
        }
    },
}
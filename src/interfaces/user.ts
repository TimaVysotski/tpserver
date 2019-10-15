import { Document } from "mongoose";

export interface IUser extends Document {
    [x: string]: any;
    email?: string;
    username?: string;
    password?: string;
    picture?: string;
    gender?: string;
    id?: string;
    token?: string;
};

export interface IUserBase {
    email?: string;
    username?: string;
    password?: string;
    gender?: string;
    _id?: string;
    token?: string;
    [key : string]: any;
};

export interface IPassword {
    password?: string,
    newPassword?: string,
    user?: IUser,
};

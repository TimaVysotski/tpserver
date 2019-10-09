import { Document } from "mongoose";

export interface IUser extends Document {
    email?: string;
    username?: string;
    password?: string;
    gender?: string;
    id?: string;
    token?: string;
}

export interface IUserBase {
    username?: string;
    password?: string;
    gender?: string;
    _id?: string;
    token?: string;
    [key : string]: any;
}

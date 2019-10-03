import { Document } from "mongoose";

export interface IUser extends Document {
    username?: string;
    password?: string;
    gender?: string;
    id?: string;
}

export interface UserInterface {
    username?: string;
    password?: string;
    gender?: string;
    _id?: string;
    [key : string]: any;
}

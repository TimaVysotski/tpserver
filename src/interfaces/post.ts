import { Document } from "mongoose";
import { IUser } from "./user";

export interface IPost extends Document{
    [x: string]: any;
    id: string;
    text: string,
    postedBy: string,
    user: IUser,
};
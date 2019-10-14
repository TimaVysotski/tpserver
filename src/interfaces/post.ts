import { Document } from "mongoose";
import { IUser } from "./user";

export interface IPost extends Document{
    id: string;
    text: string,
    postedBy: string,
    user: IUser,
}
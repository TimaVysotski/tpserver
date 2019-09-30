import { Document } from "mongoose";

export interface IPost extends Document {
    id: string;
    text: string,
    postedBy: string,
}
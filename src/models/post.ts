import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "../interfaces/post";

const PostSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    postedBy: {
        type: String,
    }
})

const post = mongoose.model<IPost>('Post', PostSchema);

export default post;
import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/post";
import DATA_BASE from "../constants/db";

const PostSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    postedBy: {
        type: String,
    },
})

const post = mongoose.model<IPost>(DATA_BASE.POST, PostSchema);

export default post;
import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/post";
import DATA_BASE from "../constants/db";

const PostSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: DATA_BASE.USER,
    },
});

const post = mongoose.model<IPost>(DATA_BASE.POST, PostSchema);

export default post;
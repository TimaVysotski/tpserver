import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/post";
import { DATA_BASE } from "../constants/db";

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

PostSchema.pre<IPost>(DATA_BASE.SAVE, function (next) {
    this.toJSON();
    next();
});

PostSchema.methods.toJSON = function () {
    const post = this.toObject();
    post.id = post._id;
    post.user.id = post.user._id;
    delete post.user._id;
    delete post.user.password;
    delete post.user.__v;
    delete post._id;
    delete post.__v;
    return post;
};

const post = mongoose.model<IPost>(DATA_BASE.POST, PostSchema);

export default post;
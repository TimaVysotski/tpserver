import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const UserSchema = new Schema({
    username: {
        type: String,
        //required: true,
        unique: true,
    },
    password: {
        type: String,
        //required: true,
    },
    gender: {
        type: String,
    }
});

const user = mongoose.model<IUser>('User', UserSchema);

export default user;

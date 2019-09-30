import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    isAuthenticated: {
        type: Boolean,
    }
});

UserSchema.statics.findByLogin = async function (username: string): Promise<IUser> {
    const user = await this.findOne({
        username: username,
    });

    return user;
}

UserSchema.pre("remove", function (next): void {
    this.model('Post').deleteMany({ user: this._id }, next);
});

const user = mongoose.model<IUser>('User', UserSchema);

export default user;

import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/user";
import BcryptMiddelware from "../middleware/bcrypt";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    token: {
        type: String,
    }
});

UserSchema.pre<IUser>("save", function (next) {
    BcryptMiddelware.createHash(this.password!)
        .then(password => {
            this.password = password;
            this.toJSON();
            next();
        })
        .catch(error => next(error));
});

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

const user = mongoose.model<IUser>('User', UserSchema);

export default user;
